FROM node:22.11.0-slim AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN ls -la
RUN npm ci
COPY frontend .
RUN npm run build

FROM node:22.11.0-slim AS admin-builder
WORKDIR /app
COPY admin/package*.json ./

RUN npm ci
COPY admin .
RUN npm run build

FROM nginx:alpine
COPY --from=frontend-builder /app/dist /usr/share/nginx/html/frontend/dist
COPY --from=admin-builder /app/dist /usr/share/nginx/html/admin/dist
RUN chmod -R 755 /usr/share/nginx/html
COPY backend/docker/nginx/nginx.conf /etc/nginx/nginx.conf