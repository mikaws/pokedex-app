FROM node:14-alpine
WORKDIR /usr/pokedex
COPY package.json ./

RUN npm install --silent

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]