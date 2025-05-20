FROM oven/bun:latest AS deps
WORKDIR /app

COPY package.json turbo.json ./
COPY apps/api/package*.json apps/api/
COPY apps/web/package*.json apps/web/
COPY packages/db/package*.json packages/db/

ENV NODE_ENV=production

RUN bun install

copy . .

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

RUN bun turbo build


EXPOSE 4000


CMD ["bun" , "apps/api/dist/index.js"]
