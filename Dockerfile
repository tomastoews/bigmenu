FROM nginx:alpine

RUN mkdir usr/share/nginx/html/bigmenu
COPY /dist/ usr/share/nginx/html/bigmenu

EXPOSE 80