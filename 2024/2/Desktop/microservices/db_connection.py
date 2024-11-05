import mysql.connector
from mysql.connector import Error

def create_connection():
    """Estabelece uma conexão com o banco de dados MySQL."""
    try:
        connection = mysql.connector.connect(
            host='host.docker.internal',  # Alterado para acessar o banco do host a partir do Docker
            user='root',                  # Altere para o seu usuário
            password='',                  # Altere para sua senha
            database='escola'
        )
        if connection.is_connected():
            print("Conexão com o banco de dados MySQL estabelecida com sucesso.")
            return connection
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        return None
