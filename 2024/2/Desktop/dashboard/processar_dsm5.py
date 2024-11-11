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
        
        lista_frequencia = aluno.get("attendanceList", [])
        total_aulas = len(lista_frequencia)
        total_presentes = sum(1 for a in lista_frequencia if a.get("attendanceStatus") == "PRESENT")
        total_faltas = total_aulas - total_presentes
        porcentagem_frequencia = (total_presentes / total_aulas) * 100 if total_aulas > 0 else 0
        
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
            "Média das Notas": media_notas,
            "DSM": "DSM-5"
        })

    # Converter para DataFrame
    df = pd.DataFrame(dados_alunos)
    return df

# Funções para calcular totais e médias
def total_alunos(df):
    return df["Nome"].nunique()

def total_aulas(df):
    return df["Total de Aulas"].sum()

def total_presencas(df):
    return df["Total Presentes"].sum()

def total_faltas(df):
    return df["Total Faltas"].sum()

def media_aulas(df):
    return df["Total de Aulas"].mean()

def media_presencas(df):
    return df["Total Presentes"].mean()

def media_faltas(df):
    return df["Total Faltas"].mean()

# Exemplo de uso
url = "http://ec2-35-173-235-57.compute-1.amazonaws.com:8080/api/students/"
try:
    dados = buscar_dados_alunos(url)
    df = processar_dados_alunos(dados)

    print(df)
    print("--------------------------------")
    print(f"Total de Alunos: {total_alunos(df)}")
    print(f"Total de Aulas: {total_aulas(df)}")
    print(f"Total de Presenças: {total_presencas(df)}")
    print(f"Total de Faltas: {total_faltas(df)}")
    print(f"Média de Aulas: {media_aulas(df)}")
    print(f"Média de Presenças: {media_presencas(df)}")
    print(f"Média de Faltas: {media_faltas(df)}")

except Exception as e:
    print(f"Erro ao buscar ou processar os dados: {e}")
