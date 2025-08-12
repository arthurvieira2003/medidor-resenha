# Multi-stage build para otimização
# Stage 1: Build dependencies
FROM node:18-alpine AS dependencies

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm install && npm cache clean --force

# Stage 2: Production
FROM node:18-alpine AS production

# Instala dumb-init para gerenciamento de processos
RUN apk add --no-cache dumb-init

# Cria usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S medidor -u 1001

WORKDIR /app

# Copia dependências do stage anterior
COPY --from=dependencies --chown=medidor:nodejs /app/node_modules ./node_modules

# Copia arquivos da aplicação
COPY --chown=medidor:nodejs . .

# Remove arquivos desnecessários
RUN rm -rf .git .gitignore README.md Dockerfile .dockerignore

# Muda para usuário não-root
USER medidor

# Expõe a porta configurada no .env (23498)
EXPOSE 23498

# Comando para iniciar a aplicação
CMD ["dumb-init", "node", "server.js"]