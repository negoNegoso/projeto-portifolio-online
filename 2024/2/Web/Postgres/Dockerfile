FROM postgres:16.4-alpine3.20

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=praxis

COPY ./query.sql /docker-entrypoint-initdb.d/

COPY script.sh /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/script.sh

EXPOSE 5432
