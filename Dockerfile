# API server
FROM node:latest

RUN mkdir -p /home/test

WORKDIR /home/test

COPY package.json .
COPY package-lock.json .
COPY express_server.js .

RUN npm install

ENV PORT 3000

EXPOSE 3000

CMD ["node", "express_server.js"]


# Frontend
