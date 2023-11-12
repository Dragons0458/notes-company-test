#!/bin/bash

npm run typeorm migration:run -- -d ./src/orm.config.ts
npm start
