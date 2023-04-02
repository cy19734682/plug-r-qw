# build front-end
FROM node:lts-alpine AS frontend

WORKDIR /app

COPY ./package.json /app

RUN npm install --unsafe-perm=true --allow-root

COPY . /app

RUN npm run build

# service
FROM node:lts-alpine

WORKDIR /app

COPY /node-serve /app

COPY --from=frontend /app/dist /app/public

EXPOSE 7890

CMD ["pnpm", "run", "node-serve-dev"]
