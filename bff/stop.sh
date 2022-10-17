#!/bin/bash

echo "=> Stopping bff"
docker-compose --env-file ./.env.docker \
               --file docker-compose-bff.yml down
