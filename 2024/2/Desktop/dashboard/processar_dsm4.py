import pandas as pd
import json
from urllib import request

def buscar_dados_dsm4(url):
    response = request.urlopen(url)
    dados = json.loads(response.read())
    return dados

def processar_dados_dsm4(dados):
    # Cria uma lista para armazenar os dados organizados
    dados_dsm_4 = []

    for aluno in dados:
        dados_dsm_4.append({
            "Nome Completo": aluno.get("nome_completo"),
            "RA": aluno.get("RA"),
            "Documento Identidade": aluno.get("documento_identidade"),
            "CPF": aluno.get("cpf"),
            "Data de Nascimento": aluno.get("data_nascimento"),
            "Gênero": aluno.get("genero"),
            "Endereço": aluno.get("endereco"),
            "Email": aluno.get("email"),
            "Telefone": aluno.get("telefone"),
            "DSM": "DSM-4"  # Identificador DSM-4
        })

    # Converter para DataFrame
    df_dsm_4 = pd.DataFrame(dados_dsm_4)
    return df_dsm_4

# Função para calcular o total de alunos
def total_alunos(df):
    return df["Nome Completo"].nunique()

# Exemplo de uso
url_dsm_4 = "10.67.57.66:3000/dsm-4/consumo"
try:
    dados_dsm_4 = buscar_dados_dsm4(url_dsm_4)
    df_dsm_4 = processar_dados_dsm4(dados_dsm_4)

    print(df_dsm_4)
    print("--------------------------------")
    print(f"Total de Alunos: {total_alunos(df_dsm_4)}")

except Exception as e:
    print(f"Erro ao buscar ou processar os dados do DSM-4: {e}")
