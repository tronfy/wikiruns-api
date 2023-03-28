FROM node:18
WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml\* ./
RUN pnpm install

COPY . .
RUN pnpm build

RUN chown -R node:node /app
EXPOSE 3000

CMD ["pnpm", "start"]
