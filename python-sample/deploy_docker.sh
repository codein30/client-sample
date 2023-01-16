#!/bin/bash
docker build -t ml-base:latest -f docker/base/Dockerfile .
docker tag ml-base:latest gcr.io/saturn-co-ml-prd/base:latest
docker push gcr.io/saturn-co-ml-prd/base:latest

docker build -t ml-workspace:latest -f docker/workspace/Dockerfile .
docker tag ml-workspace:latest gcr.io/saturn-co-ml-prd/workspace:latest
docker push gcr.io/saturn-co-ml-prd/workspace:latest

docker build -t ml-dataflow:latest -f docker/dataflow/Dockerfile .
docker tag ml-dataflow:latest gcr.io/saturn-co-ml-prd/dataflow:latest
docker push gcr.io/saturn-co-ml-prd/dataflow:latest

docker build -t ml-airflow:latest -f docker/airflow/Dockerfile .
docker tag ml-airflow:latest gcr.io/saturn-co-ml-prd/airflow:latest
docker push gcr.io/saturn-co-ml-prd/airflow:latest

gunzip docker/mysql/pyr_redplanet_local.sql.gz
docker build -t ml-mysql:latest -f docker/mysql/Dockerfile .
gzip docker/mysql/pyr_redplanet_local.sql
docker tag ml-mysql:latest gcr.io/saturn-co-ml-prd/mysql:latest
docker push gcr.io/saturn-co-ml-prd/mysql:latest

docker build -t ml-githooks:latest -f docker/githooks/Dockerfile .
docker tag ml-githooks:latest gcr.io/saturn-co-ml-prd/githooks:latest
docker push gcr.io/saturn-co-ml-prd/githooks:latest

docker build -t ml-apis:latest -f docker/apis/Dockerfile .
docker tag ml-apis:latest gcr.io/saturn-co-ml-prd/ml-apis:latest
docker push gcr.io/saturn-co-ml-prd/ml-apis:latest