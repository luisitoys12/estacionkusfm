# syntax=docker/dockerfile:1

FROM nginx:alpine

# Static site for Estación KUS FM
# Servimos el contenido generado por GitHub Pages / build estático
WORKDIR /usr/share/nginx/html
COPY . .

EXPOSE 80

# Nginx ya se lanza por defecto con la imagen base
