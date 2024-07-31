# build front-end
#FROM node:lts-alpine AS frontend
#
#WORKDIR /app
#
#COPY ./package.json /app
#
#RUN npm cache clear --force
#
#RUN npm install --force --unsafe-perm=true --allow-root
#
#COPY . /app
#
#RUN npm run build

# service
FROM node:lts-alpine

WORKDIR /app

COPY /node-serve /app

RUN npm install

#COPY --from=frontend /app/dist /app/public

EXPOSE 3006

CMD ["npm", "run", "serve"]
