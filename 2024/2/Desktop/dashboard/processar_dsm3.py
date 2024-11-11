import pandas as pd
import json
from urllib import request

def buscar_dados_dsm(url):
    response = request.urlopen(url)
    dados = json.loads(response.read())
    return dados

def processar_dados_dsm_3(dados):
    dados_dsm_3 = []

    for usuario in dados:
        nome = usuario.get("nomeUsuario")
        total_aulas_curso = sum(disciplina.get("aulasTotaisSemestreDisciplina", 0) for disciplina in usuario.get("disciplinas", []))
        total_faltas = sum(disciplina.get("quantidadeFaltas", 0) for disciplina in usuario.get("disciplinas", []))
        total_presencas = total_aulas_curso - total_faltas
        total_aulas_decorridas = total_faltas + total_presencas

        dados_dsm_3.append({
            "Nome do Aluno": nome,
            "Total de Aulas do Curso": total_aulas_curso,
            "Total de Aulas Decorridas": total_aulas_decorridas,
            "Total de Presenças": total_presencas,
            "Total de Faltas": total_faltas,
            "DSM": "DSM-3"
        })

    # Converter para DataFrame
    df_dsm_3 = pd.DataFrame(dados_dsm_3)
    return df_dsm_3

# Funções para calcular totais e médias
def total_alunos(df):
    return df["Nome do Aluno"].nunique()

def total_aulas(df):
    return df["Total de Aulas do Curso"].sum()

def total_presencas(df):
    return df["Total de Presenças"].sum()

def total_faltas(df):
    return df["Total de Faltas"].sum()

def media_aulas(df):
    return df["Total de Aulas do Curso"].mean()

def media_presencas(df):
    return df["Total de Presenças"].mean()

def media_faltas(df):
    return df["Total de Faltas"].mean()

# Adicione esta nova função após as outras funções de cálculo
def calcular_porcentagem_frequencia(df):
    total_presencas = df["Total de Presenças"].sum()
    total_aulas_decorridas = df["Total de Aulas Decorridas"].sum()
    if total_aulas_decorridas > 0:
        return (total_presencas / total_aulas_decorridas) * 100
    return 0

# Exemplo de uso
url_dsm_3 = "10.67.57.64:5000/dsm-3/consumo"
try:
    dados_dsm_3 = buscar_dados_dsm(url_dsm_3)
    df_dsm_3 = processar_dados_dsm_3(dados_dsm_3)

    print(df_dsm_3)
    print("--------------------------------")
    print(f"Total de Alunos: {total_alunos(df_dsm_3)}")
    print(f"Total de Aulas: {total_aulas(df_dsm_3)}")
    print(f"Total de Presenças: {total_presencas(df_dsm_3)}")
    print(f"Total de Faltas: {total_faltas(df_dsm_3)}")
    print(f"Média de Aulas: {media_aulas(df_dsm_3)}")
    print(f"Média de Presenças: {media_presencas(df_dsm_3)}")
    print(f"Média de Faltas: {media_faltas(df_dsm_3)}")

except Exception as e:
    print(f"Erro ao buscar ou processar os dados do DSM-3: {e}")
