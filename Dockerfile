# build front-end
FROM node:lts-alpine AS frontend

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY . /app

RUN npm run build

# service
FROM node:lts-alpine

WORKDIR /app

COPY /node-serve /app

COPY --from=frontend /app/dist /app/public

EXPOSE 7890

CMD ["npm", "run", "node-serve-dev"]
