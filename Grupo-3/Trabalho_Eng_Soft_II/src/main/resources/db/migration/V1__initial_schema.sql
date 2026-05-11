-- Script de Migração Inicial - Grupo 3
-- Define a estrutura base de usuários e roles para garantir consistência entre ambientes

CREATE TABLE IF NOT EXISTS tb_role (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tb_user (
    id BIGSERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES tb_user(id),
    FOREIGN KEY (role_id) REFERENCES tb_role(id)
);

-- Seed de Roles básicas
INSERT INTO tb_role (name) VALUES ('ROLE_USER') ON CONFLICT (name) DO NOTHING;
INSERT INTO tb_role (name) VALUES ('ROLE_ADMIN') ON CONFLICT (name) DO NOTHING;
