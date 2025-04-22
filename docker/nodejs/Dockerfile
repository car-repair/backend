ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
