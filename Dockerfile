FROM oven/bun:latest AS deps
WORKDIR /app

copy . /app

RUN bun install 

RUN bun turbo build

ENV NODE_ENV=production

EXPOSE 4000

WORKDIR apps/api

CMD ["bun" , "dist/index.js"]
