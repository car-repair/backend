FROM nginx:alpine
RUN apk add --no-cache certbot certbot-nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=car-repair-frontend /usr/share/nginx/html /usr/share/nginx/html/frontend
COPY --from=car-repair-admin /usr/share/nginx/html/admin /usr/share/nginx/html/admin
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]