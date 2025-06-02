# Базовый образ для сборки
FROM node:22.11.0-slim AS builder
WORKDIR /home/node/app
COPY backend/package*.json ./
RUN npm ci
COPY backend ./
RUN npm run build

# Финальный образ
FROM node:22.11.0-slim
WORKDIR /home/node/app
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/package*.json ./
COPY backend/.env ./
RUN npm ci
EXPOSE 3000
CMD ["node", "dist/main.js"]