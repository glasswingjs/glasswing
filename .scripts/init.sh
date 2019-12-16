#! /bin/bash

PROJECTS="template common config http router controller application"

export GIT_USER_NAME=${GIT_USER_NAME:-Dragos Crjan}
export GIT_USER_NAME=${GIT_USER_EMAIL:-dragos.cirjan@gmail.com}

prepare_for_dev() {
  npm run prepare-for-dev || true
}

set_github_user() {
  git config user.name "$GIT_USER_NAME"
  git config user.email "$GIT_USER_EMAIL"
}

cd glasswing
set_github_user
cd ..

for project in $PROJECTS; do
  PROJECT_FOLDER="./$project"
  [ -d $PROJECT_FOLDER ] || git clone https://github.com/glasswingjs/$project $PROJECT_FOLDER
  [ -d $PROJECT_FOLDER ] \
    && cd $PROJECT_FOLDER \
    && git pull \
    && npm i \
    && npm run build \
    && prepare_for_dev \
    && set_github_user \
    && cd ..
done
