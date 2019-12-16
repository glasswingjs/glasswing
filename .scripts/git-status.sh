#! /bin/bash

PROJECTS="template common config http router controller application"

cd glasswing
git status
cd ..

for project in $PROJECTS; do
  PROJECT_FOLDER="./$project"
  [ -d $PROJECT_FOLDER ] || git clone https://github.com/glasswingjs/$project $PROJECT_FOLDER
  [ -d $PROJECT_FOLDER ] \
    && cd $PROJECT_FOLDER \
    && echo ">> $PROJECT_FOLDER" \
    && git status \
    && cd ..
done
