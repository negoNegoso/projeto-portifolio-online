from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from db_connection import create_connection

# Configuração do servidor
host_name = "0.0.0.0"  # Configuração para funcionar no Docker
server_port = 8080

class AlunoServiceHandler(BaseHTTPRequestHandler):

    def set_headers(self):
        """Configura os headers padrão."""
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()

    def do_GET(self):
        """Lida com requisições GET para listar todos os alunos."""
        print("Recebendo uma requisição GET...")  # Log para confirmar a requisição
        self.set_headers()
        
        try:
            connection = create_connection()
            print("Conexão com o banco estabelecida.")  # Log para confirmar a conexão
            cursor = connection.cursor(dictionary=True)
            
            # Consulta para listar todos os alunos
            cursor.execute("SELECT * FROM ALUNOS")  # Verifique o nome exato da tabela de alunos
            result = cursor.fetchall()
            print("Consulta ao banco realizada com sucesso.")  # Log após a consulta
            
            # Envia a resposta JSON com os dados dos alunos
            response = json.dumps(result, default=str)
            self.wfile.write(bytes(response, "utf-8"))
            print("Resposta enviada com sucesso.")  # Log para confirmação da resposta
            
        except Exception as err:
            print(f"Erro ao processar requisição GET: {err}")  # Log de erro
            self.send_response(500)
            self.wfile.write(bytes(json.dumps({"error": str(err)}), "utf-8"))
        
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
                print("Conexão com o banco fechada.")  # Log ao fechar a conexão

def run_server():
    web_server = HTTPServer((host_name, server_port), AlunoServiceHandler)
    print(f"Servidor de Alunos iniciado em http://{host_name}:{server_port}")

    try:
        web_server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        web_server.server_close()
        print("Servidor de Alunos encerrado.")

if __name__ == "__main__":
    run_server()