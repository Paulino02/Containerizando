FROM node:latest

ENV APP_PORT=8080
ENV MYSQL_IP=bd

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
