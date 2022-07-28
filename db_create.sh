#!/bin/bash
set -e

CONTAINER_NAME="graph-ql-sample";
PW="GraphQlPassword";
DB="graphql_sample";

docker run -p 3306:3306 --name $CONTAINER_NAME -e MYSQL_ROOT_PASSWORD=$PW -e MYSQL_DATABASE=$DB -d mysql:8.0
