# build front-end
FROM node:lts-alpine AS frontend

RUN npm install pnpm -g

WORKDIR /app

COPY ./package.json /app

RUN pnpm install

COPY . /app

RUN pnpm run build

# service
FROM node:lts-alpine

WORKDIR /app

COPY /node-serve /app

COPY --from=frontend /app/dist /app/public

EXPOSE 7890

CMD ["pnpm", "run", "node-serve-dev"]
