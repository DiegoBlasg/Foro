FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm run build

COPY . .

EXPOSE 3000

CMD [ "serve", "-s", "build"]