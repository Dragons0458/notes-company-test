FROM node:18.18.2-alpine3.18

WORKDIR /usr/src/app

EXPOSE 3000

COPY ./package*.json ./

RUN npm i

COPY . .

CMD ["sh", "init.sh"]
