FROM node:alpine

WORKDIR /api

EXPOSE 3003

# Install pnpm globally
RUN npm install -g pnpm typescript

COPY . .

# Install all dependencies using pnpm
RUN pnpm install -P

RUN pnpm build

ENV NODE_ENV=production

CMD ["pnpm", "start"]