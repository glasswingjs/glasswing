#! /bin/bash

PROJECTS="application common config controller http router template"

mkdir -p "./node_modules/@glasswing"

git clone https://github.com/glasswingjs/glasswing ./node_modules/glasswing

for project in $PROJECTS; do
  PROJECT_FOLDER="./node_modules/@glasswing/$project"
  [ -d $PROJECT_FOLDER ] || git clone https://github.com/glasswingjs/$project $PROJECT_FOLDER
  [ -d $PROJECT_FOLDER ] && cd $PROJECT_FOLDER && git pull && npm i && rm -rf node_modules/@glasswing && cd ../../..
done
