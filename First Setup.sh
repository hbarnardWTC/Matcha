#!/bin/sh
cd "./matcha-frontend/matcha-backend"
npm install
node init
cd "../"
npm install
start "" "http://localhost:5005"
npm start
