import pandas as pd
import json
from urllib import request

def buscar_dados_alunos(url):
    response = request.urlopen(url)
    dados = json.loads(response.read())
    return dados

def processar_dados_alunos(dados):
    dados_alunos = []

    for aluno in dados:
        id_aluno = aluno.get("id")
        nome = aluno.get("name")
        email = aluno.get("email")
        
        # Cálculo de detalhes de frequência
        lista_frequencia = aluno.get("attendanceList", [])
        total_aulas = len(lista_frequencia)
        total_presentes = sum(1 for a in lista_frequencia if a.get("attendanceStatus") == "PRESENT")
        total_faltas = total_aulas - total_presentes
        porcentagem_frequencia = (total_presentes / total_aulas) * 100 if total_aulas > 0 else 0
        
        # Cálculo de detalhes das notas
        lista_notas = aluno.get("gradeNotesList", [])
        if lista_notas:
            notas = [nota.get("media") for nota in lista_notas if nota.get("media") is not None]
            media_notas = sum(notas) / len(notas) if notas else 0
        else:
            media_notas = 0
        
        dados_alunos.append({
            "ID": id_aluno,
            "Nome": nome,
            "Email": email,
            "Total de Aulas": total_aulas,
            "Total Presentes": total_presentes,
            "Total Faltas": total_faltas,
            "Porcentagem de Frequência": porcentagem_frequencia,
            "Média das Notas": media_notas
        })

    # Converter para DataFrame
    df = pd.DataFrame(dados_alunos)
    return df

# Funções para calcular o total de cada coluna

def total_total_de_aulas(df):
    return df["Total de Aulas"].sum()

def total_total_presentes(df):
    return df["Total Presentes"].sum()

def total_total_faltas(df):
    return df["Total Faltas"].sum()

def total_porcentagem_frequencia(df):
    return df["Porcentagem de Frequência"].sum()

def total_media_das_notas(df):
    return df["Média das Notas"].sum()

# Função para calcular a média das médias apenas dos alunos com média registrada
def media_dos_alunos_com_media_registrada(df):
    df_com_media = df[df["Média das Notas"] > 0]
    if len(df_com_media) > 0:
        return df_com_media["Média das Notas"].mean()
    return 0

# Funções para média de presença e faltas em relação ao total de aulas

def media_presencas_em_relacao_ao_total(df):
    total_aulas = df["Total de Aulas"].sum()
    total_presencas = df["Total Presentes"].sum()
    return (total_presencas / total_aulas) * 100 if total_aulas > 0 else 0

def media_faltas_em_relacao_ao_total(df):
    total_aulas = df["Total de Aulas"].sum()
    total_faltas = df["Total Faltas"].sum()
    return (total_faltas / total_aulas) * 100 if total_aulas > 0 else 0

# Exemplo de como usar as funções no backend
url = "http://ec2-35-173-235-57.compute-1.amazonaws.com:8080/api/students/"
try:
    dados = buscar_dados_alunos(url)
    df = processar_dados_alunos(dados)

    # Chamadas das novas funções
    media_presencas = media_presencas_em_relacao_ao_total(df)
    media_faltas = media_faltas_em_relacao_ao_total(df)

    print(df)
    print("--------------------------------")
    print(f"Total de Aulas: {total_total_de_aulas(df)}")
    print(f"Total de Presentes: {total_total_presentes(df)}")
    print(f"Total de Faltas: {total_total_faltas(df)}")
    print(f"Total de Frequência: {total_porcentagem_frequencia(df)}")
    print(f"Total de Média das Notas: {total_media_das_notas(df)}")
    print(f"Média dos Alunos com Média Registrada: {media_dos_alunos_com_media_registrada(df)}")
    print(f"Média de Presenças em Relação ao Total de Aulas: {media_presencas:.2f}%")
    print(f"Média de Faltas em Relação ao Total de Aulas: {media_faltas:.2f}%")

except Exception as e:
    print(f"Erro ao buscar ou processar os dados: {e}")

def contar_alunos_local(dados):
    """Conta o número de alunos no banco de dados local"""
    try:
        return len(dados)  # dados já é uma lista de alunos
    except Exception as e:
        print(f"Erro ao contar alunos locais: {e}")
        return 0
