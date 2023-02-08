FROM node:18.12.1 as development

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run prisma:generate