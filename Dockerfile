FROM oven/bun:latest AS deps

WORKDIR /app

COPY package*.json ./
COPY packages/db/package*.json ./packages/db/
COPY apps/web/package*.json ./apps/web/
COPY apps/api/package*.json ./apps/api/

RUN bun install  --production

COPY . .

EXPOSE 4000

RUN bun run build

CMD ["bun" , "apps/api/dist/index.js"]
