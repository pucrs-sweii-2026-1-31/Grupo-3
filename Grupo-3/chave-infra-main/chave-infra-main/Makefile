.PHONY: setup up down logs reset tf-init tf-apply wait-infra

COMPOSE = docker compose

# 1. Setup completo
setup: .env
	@echo "[make] Iniciando setup completo via Docker..."
	$(COMPOSE) up -d postgres ministack
	@echo "[make] Aguardando 10 segundos para a infraestrutura estabilizar..."
	@timeout /t 10 /nobreak > nul
	@$(MAKE) tf-init
	@$(MAKE) tf-apply
	@echo "[make] Subindo todos os serviços (Backend, Shell, MFE)..."
	$(COMPOSE) up -d
	@echo "[make] Setup concluído com sucesso!"

# 2. Inicializa o Terraform
tf-init:
	@echo "[make] Inicializando Terraform (dentro do Docker)..."
	$(COMPOSE) run --rm infra-provisioner init

# 3. Aplica o Terraform
tf-apply:
	@echo "[make] Provisionando recursos AWS local (dentro do Docker)..."
	$(COMPOSE) run --rm infra-provisioner apply -auto-approve

# 4. Sobe os serviços
up:
	$(COMPOSE) up -d

# 5. Para e remove
down:
	$(COMPOSE) down

# 6. Logs
logs:
	$(COMPOSE) logs -f

# 7. Limpeza total
reset:
	@echo "[make] Derrubando tudo e limpando volumes..."
	$(COMPOSE) down -v --remove-orphans
	@$(MAKE) setup

# 8. Verificação do .env
.env:
	@if [ ! -f .env ]; then \
		echo "[make] ERRO: Arquivo .env não encontrado!"; \
		exit 1; \
	fi