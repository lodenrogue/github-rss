FROM node:12.22.0-alpine3.12

COPY ./ /app

WORKDIR /app

ENTRYPOINT ["node", "github-rss.js"] 
