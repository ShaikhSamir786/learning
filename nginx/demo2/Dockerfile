FROM node:22

WORKDIR /app

COPY server.js .
COPY public ./public
COPY package.json .
COPY package-lock.json .


RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]