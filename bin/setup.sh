#! /bin/bash

# setting up git hooks

cp ./bin/pre-commit .git/hooks/

# install npm packages

npm install

# run coverage

npm run coverage