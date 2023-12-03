FROM postgres:16-alpine as db

WORKDIR /app

COPY ./init.sh /docker-entrypoint-initdb.d
COPY ./dump.sql ./scripts/db/dump.sql