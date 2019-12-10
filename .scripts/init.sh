#! /bin/bash

PROJECTS="template common config http router controller application"

for project in $PROJECTS; do
  PROJECT_FOLDER="./$project"
  [ -d $PROJECT_FOLDER ] || git clone https://github.com/glasswingjs/$project $PROJECT_FOLDER
  [ -d $PROJECT_FOLDER ] \
    && cd $PROJECT_FOLDER \
    && git pull \
    && npm i \
    && npm run build \
    && ( npm run prepare-for-dev || true )  \
    && cd ..
done
