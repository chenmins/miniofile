FROM node:12
WORKDIR /usr/src/app
RUN npm install
COPY package*.json ./
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]