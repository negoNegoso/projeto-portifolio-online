FROM zabbix/zabbix-agent2:alpine-7.0-latest

USER root

# Install required packages
RUN apk add --no-cache curl jq

# Copy the script to the container
COPY ./scripts/script.sh /scripts/script.sh

# Give execution permissions to the script
RUN chmod +x /scripts/script.sh

# Set the entry point to run the script
ENTRYPOINT ["/scripts/script.sh"]
