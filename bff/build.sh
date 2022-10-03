#!/bin/bash

APP="${PWD##*/}"

# Building docker image
echo "Begin: Building docker image si5-ci-bdfp/$APP"
docker build -t "si5-ci-bdfp/$APP" .
echo "Done: Building docker image si5-ci-bdfp/$APP"
