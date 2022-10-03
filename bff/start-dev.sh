#!/bin/bash

echo "=> Starting development life-support-service"
docker-compose -f docker-compose-bff-development.yml up --build -V
