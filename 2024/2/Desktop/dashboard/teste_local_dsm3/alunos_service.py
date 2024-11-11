from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from db_connection import create_connection

# Configuração do servidor
hostName = "localhost"
serverPort = 8080


class MyServer(BaseHTTPRequestHandler):

    def _set_headers(self):
        """Configura os headers padrão."""
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers()

    def do_GET(self):
        """Lida com requisições GET para listar apenas os alunos sem o campo de senha."""
        self._set_headers()

        try:
            connection = create_connection()
            cursor = connection.cursor(dictionary=True)

            # Primeiro, busca os alunos e suas informações básicas
            cursor.execute("""
                SELECT DISTINCT
                    u.usuarioID,
                    u.nomeUsuario,
                    u.dataNascUsuario,
                    u.sexoUsuario,
                    u.cpfUsuario,
                    u.ufUsuarios,
                    a.raAluno,
                    c.nomeCurso,
                    c.siglaCurso,
                    c.tipoDuração,
                    c.periodoCurso,
                    c.tipoGraduacaoCurso
                FROM usuarios u
                INNER JOIN alunos a ON u.usuarioID = a.usuarioID
                INNER JOIN matriculas m ON u.usuarioID = m.usuarioID
                INNER JOIN cursos c ON m.cursoID = c.cursoID
                WHERE u.tipoUsuario = 'aluno' AND u.ativo = 1
            """)
            alunos = cursor.fetchall()

            # Para cada aluno, busca suas disciplinas
            for aluno in alunos:
                cursor.execute("""
                    SELECT 
                        d.nomeDisciplina,
                        d.siglaDisciplina,
                        d.aulasSemanaisDisciplina,
                        d.aulasTotaisSemestreDisciplina,
                        t.turma,
                        dia.nomedia AS dia,
                        h.horaInicio,
                        h.horaFim,
                        COUNT(CASE WHEN ch.faltasAluno = 0 THEN 1 END) AS quantidadeFaltas
                    FROM disciplinas d
                    INNER JOIN turmas t ON d.turmaID = t.turmaID
                    INNER JOIN dias dia ON d.disciplinaID = dia.disciplinaID
                    INNER JOIN horarios h ON dia.horarioID = h.horarioID
                    LEFT JOIN chamadas ch ON t.turmaID = ch.turmaID
                    WHERE ch.usuarioID = %s
                    GROUP BY 
                        d.nomeDisciplina,
                        d.siglaDisciplina,
                        d.aulasSemanaisDisciplina,
                        d.aulasTotaisSemestreDisciplina,
                        t.turma,
                        dia.nomedia,
                        h.horaInicio,
                        h.horaFim
                """, (aluno['usuarioID'],))

                aluno['disciplinas'] = cursor.fetchall()

            # Envia a resposta JSON com os dados dos alunos
            self.wfile.write(bytes(json.dumps(alunos, default=str), "utf-8"))

        except Exception as err:
            self.send_response(500)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(bytes(json.dumps({"error": str(err)}), "utf-8"))

        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()


if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print(f"Servidor iniciado em http://{hostName}:{serverPort}")

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Servidor encerrado.")