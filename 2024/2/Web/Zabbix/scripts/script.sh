#!/bin/bash
set -e

ZBX_URL="http://zabbix-web-apache:8080/api_jsonrpc.php"
ZBX_USER="Admin"
ZBX_PASSWORD="zabbix"
TEMPLATE_FILE="templates/zbx-db.yaml"
NEW_HOST_GROUP="Databases"
TEMPLATE_NAME="Zabbix DB"
DB_HOST_IP_AGENT=$(getent hosts zabbix-agent-db | awk '{ print $1 }')
HOST_IP=$(getent hosts zabbix-web-apache | awk '{ print $1 }')
POSTGRESQL_TEMPLATE_NAME="PostgreSQL by Zabbix agent 2"


until curl --silent --request POST \
    --url "$ZBX_URL" \
    --header 'Content-Type: application/json-rpc' \
    --data '{"jsonrpc":"2.0","method":"apiinfo.version","params":{},"id":1}' \
    | grep -q '"result"'; do
    >&2 echo "Zabbix server is unavailable - sleeping"
    sleep 1
done

echo "Zabbix Server is available"

get_auth_token() {
    AUTH_TOKEN=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "user.login",
            "params": {
                "username": "'"$ZBX_USER"'",
                "password": "'"$ZBX_PASSWORD"'"
            },
            "id": 1
        }' | jq -r '.result')
    echo "$AUTH_TOKEN"
}

AUTH_TOKEN=$(get_auth_token)
echo "Auth token: $AUTH_TOKEN"

import_template() {
    local auth_token=$1
    local template_file=$2

    TEMPLATE_CONTENT=$(cat "$template_file")

    TEMPLATE_CONTENT_ESCAPED=$(echo "$TEMPLATE_CONTENT" | jq -Rs .)

    IMPORT_TEMPLATE_RESPONSE=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "configuration.import",
            "params": {
                "format": "yaml",
                "rules": {
                    "templates": {
                        "createMissing": true,
                        "updateExisting": true
                    },
                    "items": {
                        "createMissing": true,
                        "updateExisting": true,
                        "deleteMissing": true
                    },
                    "triggers": {
                        "createMissing": true,
                        "updateExisting": true,
                        "deleteMissing": true
                    },
                    "valueMaps": {
                        "createMissing": true,
                        "updateExisting": false
                    }
                },
                "source": '"$TEMPLATE_CONTENT_ESCAPED"'
            },
            "auth": "'"$auth_token"'",
            "id": 1
        }')

    echo "Import response: $IMPORT_TEMPLATE_RESPONSE"
}


update_template() { 
    local auth_token=$1
    local template_id=$2 
    local linked_template_id=$3

    UPDATE_RESPONSE=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "template.update",
            "params": {
                "templateid": "'"$template_id"'",
                "templates": [
                    {
                        "templateid": "'"$linked_template_id"'"
                    }
                ]
            },
            "auth": "'"$auth_token"'",
            "id": 1
        }')

    echo "Update response: $UPDATE_RESPONSE"
}
get_host_group_id() {
    local auth_token=$1
    local group_name=$2

    GROUP_ID=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "hostgroup.get",
            "params": {
                "filter": {
                    "name": ["'"$group_name"'"]
                }
            },
            "auth": "'"$auth_token"'",
            "id": 1
        }' | jq -r '.result[0].groupid')
    echo "$GROUP_ID"
}

get_template_id() {
    local auth_token=$1
    local template_name=$2

    TEMPLATE_ID=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "template.get",
            "params": {
                "filter": {
                    "host": ["'"$template_name"'"]
                }
            },
            "auth": "'"$auth_token"'",
            "id": 1
        }' | jq -r '.result[0].templateid')
    echo "$TEMPLATE_ID"
}

create_host() {
    local auth_token=$1
    local hostname=$2
    local host_ip=$3
    local group_id=$4
    local template_id=$5

    CREATE_HOST_RESPONSE=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "host.create",
            "params": {
                "host": "'"$hostname"'",
                "interfaces": [
                    {
                        "type": 1,
                        "main": 1,
                        "useip": 1,
                        "ip": "'"$host_ip"'",
                        "dns": "",
                        "port": "10050"
                    }
                ],
                "groups": [
                    {
                        "groupid": "'"$group_id"'"
                    }
                ],
                "templates": [
                    {
                        "templateid": "'"$template_id"'"
                    }
                ]
            },
            "auth": "'"$auth_token"'",
            "id": 1
        }')

    echo "Create host response: $CREATE_HOST_RESPONSE"
}





update_host_ip() {
    local auth_token=$1
    local hostname=$2
    local new_ip=$3

    HOST_ID=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "host.get",
            "params": {
                "filter": {
                    "host": ["'"$hostname"'"]
                }
            },
            "auth": "'"$auth_token"'",
            "id": 1
        }' | jq -r '.result[0].hostid')

    echo "Host ID: $HOST_ID"

    INTERFACE_ID=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "hostinterface.get",
            "params": {
                "hostids": ["'"$HOST_ID"'"],
                "filter": {
                    "type": 1
                }
            },
            "auth": "'"$auth_token"'",
            "id": 1
        }' | jq -r '.result[0].interfaceid')

    echo "Interface ID: $INTERFACE_ID"

    UPDATE_IP_RESPONSE=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "hostinterface.update",
            "params": {
                "interfaceid": "'"$INTERFACE_ID"'",
                "ip": "'"$new_ip"'"
            },
            "auth": "'"$auth_token"'",
            "id": 1
        }')

    echo "Update IP response: $UPDATE_IP_RESPONSE"
}

add_web_scenario() {
    local auth_token=$1
    local host_id=$2
    local scenario_name=$3
    local url_step_1=$4
    local url_step_2=$5

    ADD_SCENARIO_RESPONSE=$(curl --silent --request POST \
        --url "$ZBX_URL" \
        --header 'Content-Type: application/json-rpc' \
        --data '{
            "jsonrpc": "2.0",
            "method": "httptest.create",
            "params": {
                "name": "'"$scenario_name"'",
                "hostid": "'"$host_id"'",
                "steps": [
                    {
                        "name": "Check Backend",
                        "url": "'"$url_step_1"'",
                        "status_codes": "200",
                        "no": 1,
                        "timeout": "5s"
                    },
                    {
                        "name": "Check Frontend",
                        "url": "'"$url_step_2"'",
                        "status_codes": "200",
                        "no": 2,
                        "timeout": "5s"
                    }
                ],
                "delay": 60
            },
            "auth": "'"$auth_token"'",
            "id": 1
        }')
    echo "Add Web Scenario Response: $ADD_SCENARIO_RESPONSE"
}


SERVER_AGENT_IP=$(getent hosts zabbix-agent | awk '{ print $1 }')
update_host_ip "$AUTH_TOKEN" "Zabbix server" "$SERVER_AGENT_IP"

import_template "$AUTH_TOKEN" "$TEMPLATE_FILE"

GROUP_ID=$(get_host_group_id "$AUTH_TOKEN" "$NEW_HOST_GROUP")
echo "Host group ID: $GROUP_ID"

TEMPLATE_ID=$(get_template_id "$AUTH_TOKEN" "$TEMPLATE_NAME")
echo "Template ID: $TEMPLATE_ID"

POSTGRESQL_TEMPLATE_ID=$(get_template_id "$AUTH_TOKEN" "$POSTGRESQL_TEMPLATE_NAME")
echo "PostgreSQL by Zabbix agent 2 Template ID: $POSTGRESQL_TEMPLATE_ID"

update_template "$AUTH_TOKEN" "$TEMPLATE_ID" "$POSTGRESQL_TEMPLATE_ID"


DB_HOSTNAME="db"

create_host "$AUTH_TOKEN" "$DB_HOSTNAME" "$DB_HOST_IP_AGENT" "$GROUP_ID" "$TEMPLATE_ID"

SCENARIO_NAME=WEB-MONITORING
BACKEND=$(getent hosts praxis-backend-api | awk '{ print $1 }')
BACKEND_URL="http://$BACKEND:3000/"

FRONTEND=$(getent hosts praxis-frontend | awk '{ print $1 }')
FRONTEND_URL="http://$FRONTEND:5173/"

add_web_scenario "$AUTH_TOKEN" "$HOST_ID" "$SCENARIO_NAME" "$BACKEND_URL" "$FRONTEND_URL"
