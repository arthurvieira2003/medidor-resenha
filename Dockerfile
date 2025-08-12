# Use uma imagem nginx leve para servir arquivos estáticos
FROM nginx:alpine

# Remove a configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos do projeto para o diretório de arquivos estáticos do nginx
COPY . /usr/share/nginx/html/

# Cria uma configuração personalizada do nginx
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 23498;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Expõe a porta 23498
EXPOSE 23498

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]