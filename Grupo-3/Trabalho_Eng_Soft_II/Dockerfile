# Estágio 1: Build (Compilação do projeto)
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copia apenas o arquivo de configuração de dependências primeiro (otimiza o cache)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o código fonte e gera o JAR ignorando os testes (para agilizar o deploy)
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: Runtime (Execução)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copia o JAR gerado no estágio anterior
COPY --from=build /app/target/*.jar app.jar

# Define as variáveis de ambiente padrão (serão sobrescritas pelo docker-compose)
ENV PORT=8080
EXPOSE 8080

# Executa o JAR otimizando o uso de memória no container
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]