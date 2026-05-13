FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código (incluindo o vite.config.ts)
COPY . .

# Recebe a URL do MS de Auth via build-arg
ARG VITE_MS_AUTH_URL=http://localhost:3001/api/auth
ENV VITE_MS_AUTH_URL=$VITE_MS_AUTH_URL

# GERA O ARQUIVO remoteEntry.js
RUN npm run build

# Expõe a porta do MFE
EXPOSE 4001

# Serve o conteúdo buildado na porta 4001
CMD ["npm", "run", "preview"]