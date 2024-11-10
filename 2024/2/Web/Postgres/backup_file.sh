#!/bin/bash

# Configurações do backup
container_name="praxys_db"    # Nome do container Docker onde o PostgreSQL está rodando
db_user="user_admin"                     # Usuário do banco de dados PostgreSQL
db_name="praxys"                        # Nome do banco de dados a ser feito o backup
backup_dir="/home/renato/backup"    # Diretório local onde o backup será salvo
timestamp=$(date +"%Y%m%d_%H%M%S")             # Timestamp para o nome do arquivo de backup
backup_file_name="${db_name}_backup_$timestamp.sql"
backup_file_path="${backup_dir}/${backup_file_name}"

# Cria o diretório de backup se não existir
mkdir -p "$backup_dir"

# Executa o comando de backup dentro do container Docker
echo "Iniciando backup do banco de dados $db_name..."
docker exec "$container_name" pg_dump -U "$db_user" -d "$db_name" > "$backup_file_path"

# Verifica se o backup foi gerado com sucesso
if [ -f "$backup_file_path" ]; then
    echo "Backup concluído com sucesso. Arquivo salvo em: $backup_file_path"
else
    echo "Erro ao realizar o backup do banco de dados."
fi
