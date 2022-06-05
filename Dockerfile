FROM node:16.15.0-buster

WORKDIR /usr/app
COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]