#!/bin/bash

rm -rf $1

mkdir $1
mkdir $1/images/

cp app/images/* $1/images/
cp app/styles.css styles.css
cp app/index.html $1/index.html
cp app/$1.js $1/index.js
