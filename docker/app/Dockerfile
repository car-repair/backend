ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /home/node/app
COPY backend/package*.json ./
RUN npm ci
COPY backend .
RUN npm run build

FROM node:${NODE_VERSION}-slim
WORKDIR /home/node/app
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/package*.json ./
COPY backend/.env ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start:prod"]