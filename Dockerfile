# Static site (GummyGains) served via nginx — Railway auto-detects this Dockerfile.
FROM nginx:alpine

COPY . /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Railway injects PORT at runtime; nginx's official entrypoint scripts run
# envsubst on templates/*.template -> conf.d/*.conf automatically at container start.
ENV PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
