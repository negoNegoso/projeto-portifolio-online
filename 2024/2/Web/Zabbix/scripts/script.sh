#!/bin/bash
set -x

ZBX_URL="http://localhost:8080/zabbix/api_jsonrpc.php"
ZBX_USER="Admin"
ZBX_PASSWORD="zabbix"
TEMPLATE_FILE="../templates/zbx-db.xml"
NEW_HOSTNAME="db"
NEW_HOST_GROUP="Databases"
NEW_HOST_IP="zabbix-agent-db"
TEMPLATE_NAME="Zabbix DB"

get_template_id() {
    local auth_token="$1"
    local template_name="$2"
    curl -s -X POST -H "Content-Type: application/json" \
    -d '{
        "jsonrpc": "2.0",
        "method": "template.get",
        "params": {
            "output": ["templateid"],
            "filter": {
                "host": ["'"${template_name}"'"]
            }
        },
        "auth": "'"${auth_token}"'",
        "id": 1
    }' "${ZBX_URL}" | jq -r .result[0].templateid
}

get_group_id() {
    local auth_token="$1"
    local group_name="$2"
    curl -s -X POST -H "Content-Type: application/json" \
    -d '{
        "jsonrpc": "2.0",
        "method": "hostgroup.get",
        "params": {
            "output": ["groupid"],
            "filter": {
                "name": ["'"${group_name}"'"]
            }
        },
        "auth": "'"${auth_token}"'",
        "id": 1
    }' "${ZBX_URL}" | jq -r .result[0].groupid
}

# Authenticate with Zabbix API
AUTH_TOKEN=$(curl -s -X POST -H "Content-Type: application/json" \
-d '{
    "jsonrpc": "2.0",
    "method": "user.login",
    "params": {
        "user": "'"${ZBX_USER}"'",
        "password": "'"${ZBX_PASSWORD}"'"
    },
    "id": 1
}' "${ZBX_URL}" | jq -r .result)

# Check if AUTH_TOKEN is empty
if [ -z "$AUTH_TOKEN" ]; then
    echo "Error: Failed to authenticate with Zabbix API."
    exit 1
fi

# Create the host in Zabbix
curl -s -X POST -H "Content-Type: application/json" \
-d '{
    "jsonrpc": "2.0",
    "method": "host.create",
    "params": {
        "host": "'"${NEW_HOSTNAME}"'",
        "interfaces": [{
            "type": 1,
            "main": 1,
            "useip": 0,
            "dns": "'"${NEW_HOST_IP}"'",
            "port": "10050"
        }],
        "groups": [{
            "groupid": "'"$(get_group_id "${AUTH_TOKEN}" "${NEW_HOST_GROUP}")"'"
        }],
        "templates": [{
            "templateid": "'"$(get_template_id "${AUTH_TOKEN}" "${TEMPLATE_NAME}")"'"
        }]
    },
    "auth": "'"${AUTH_TOKEN}"'",
    "id": 1
}' "${ZBX_URL}"

# Logout from Zabbix API
curl -s -X POST -H "Content-Type: application/json" \
-d '{
    "jsonrpc": "2.0",
    "method": "user.logout",
    "params": [],
    "auth": "'"${AUTH_TOKEN}"'",
    "id": 1
}' "${ZBX_URL}"
