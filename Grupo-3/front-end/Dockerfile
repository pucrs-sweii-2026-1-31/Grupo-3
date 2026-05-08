FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código (incluindo o vite.config.ts)
COPY . .

# GERA O ARQUIVO remoteEntry.js (Sem isso o Shell dá erro 404)
RUN npm run build

# Expõe a porta do MFE
EXPOSE 4001

# Serve o conteúdo buildado na porta 4001
CMD ["npm", "run", "preview"]