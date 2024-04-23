# Use nginx 1.25 as the base image
FROM nginxinc/nginx-unprivileged:1.25-bookworm

USER root

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update -y \  
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=dialog

RUN rm /usr/share/nginx/html/index.html

COPY ./src /usr/share/nginx/html/
COPY ./package.json /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html/ && chmod -R 755 /usr/share/nginx/html/

# Remove the default nginx configuration file and replace it with yours
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

USER nginx

WORKDIR /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
