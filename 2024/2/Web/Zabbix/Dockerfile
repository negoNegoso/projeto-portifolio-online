FROM zabbix/zabbix-agent2:alpine-7.0-latest

USER root

RUN apk add --no-cache curl jq

COPY ./scripts/script.sh /scripts/script.sh

COPY . .

RUN chmod +x /scripts/script.sh

CMD ["/scripts/script.sh"]
