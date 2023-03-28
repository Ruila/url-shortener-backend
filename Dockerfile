FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/app

COPY ["package.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN yarn

CMD yarn start
