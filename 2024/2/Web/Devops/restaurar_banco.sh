#!/bin/bash

# Configurações da restauração
container_name="praxis_db"    # Nome do container Docker onde o PostgreSQL está rodando
db_user="user_admin"                 # Usuário do banco de dados PostgreSQL
db_name="praxis"                    # Nome do banco de dados a ser restaurado
backup_dir="/home/renato/backup"  # Diretório onde o backup está salvo
backup_file_name="$(ls ${backup_dir} | awk '{print $1}')" # Nome do arquivo de backup (informe o arquivo correto)
backup_file_path="${backup_dir}/${backup_file_name}"

# Verifica se o arquivo de backup existe
if [ ! -f "$backup_file_path" ]; then
    echo "Erro: Arquivo de backup não encontrado em $backup_file_path"
    exit 1
fi

# Reinicia o container (caso não esteja em execução)
echo "Verificando se o container $container_name está em execução..."
if [ "$(docker ps -q -f name=$container_name)" ]; then
    echo "Container $container_name já está em execução."
else
    echo "Iniciando o container $container_name..."
    docker start "$container_name"
fi

# Dropa o banco de dados atual (para garantir restauração limpa)
echo "Dropping o banco de dados existente $db_name..."
docker exec "$container_name" psql -U "$db_user" -c "DROP DATABASE IF EXISTS $db_name"
echo "Criando um novo banco de dados $db_name..."
docker exec "$container_name" psql -U "$db_user" -c "CREATE DATABASE $db_name"

# Restaura o banco de dados a partir do backup
echo "Iniciando a restauração do banco de dados $db_name a partir de $backup_file_path..."
docker exec -i "$container_name" psql -U "$db_user" -d "$db_name" < "$backup_file_path"

# Verifica se a restauração foi bem-sucedida
if [ $? -eq 0 ]; then
    echo "Restauração concluída com sucesso."
else
    echo "Erro durante a restauração do banco de dados."
fi
