FROM registry.cn-beijing.aliyuncs.com/dashuocom/node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]