# Static GummyGains site: only public assets belong in the document root.
FROM nginx:alpine

COPY *.html *.png *.jpg *.ico robots.txt sitemap.xml llms.txt cb5ed56a846d444089d11c93e366f389.txt style.css /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY data/ /usr/share/nginx/html/data/
COPY pins/ /usr/share/nginx/html/pins/
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

ENV PORT=8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
