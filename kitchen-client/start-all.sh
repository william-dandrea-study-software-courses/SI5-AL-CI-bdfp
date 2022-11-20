#!/bin/bash

docker-compose --project-name ci --file ./docker-compose-prod.yml build
docker-compose --project-name ci --file ./docker-compose-prod.yml up -d
