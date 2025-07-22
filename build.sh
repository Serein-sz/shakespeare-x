#! /bin/bash

docker stop shakespeare-x
docker rm shakespeare-x
docker build -t shakespeare-x .
docker run -p 3000:80 -d --name=shakespeare-x shakespeare-x
