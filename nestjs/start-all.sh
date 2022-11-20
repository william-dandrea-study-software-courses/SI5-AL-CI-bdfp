#!/bin/bash

docker-compose --project-name soa-dev --file ./docker-compose-prod.yml build
docker-compose --project-name soa-dev --file ./docker-compose-prod.yml up -d
