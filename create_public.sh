#!/bin/bash

rm -rf public

mkdir -p public/$1/images/

cp app/images/* public/$1/images/
cp app/styles.css public/$1/styles.css
cp app/index.html public/$1/index.html
cp app/$1.js public/$1/index.js
