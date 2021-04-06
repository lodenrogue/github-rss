FROM node:12.22.0-alpine3.12

COPY ./ /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["node", "github-rss.js"] 
