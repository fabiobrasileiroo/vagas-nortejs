-- Cria um banco shadow fixo para o Prisma Migrate.
-- OBS: este script só roda na primeira inicialização do container (volume novo).

CREATE DATABASE IF NOT EXISTS `vagas_nortejs_shadow`;

-- Concede permissões apenas no schema shadow para o usuário da aplicação.
GRANT ALL PRIVILEGES ON `vagas_nortejs_shadow`.* TO 'usernortejs'@'%';
FLUSH PRIVILEGES;
