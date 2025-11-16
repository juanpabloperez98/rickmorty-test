#!/bin/sh
set -e

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
exec npx ts-node-dev src/server.ts
