#!/bin/bash



echo "=> Starting bff"
docker-compose --env-file ./.env.docker \
               --file docker-compose-bff.yml up -d


