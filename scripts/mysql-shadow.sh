#!/usr/bin/env sh
set -eu

CONTAINER_NAME=${CONTAINER_NAME:-nortejs-mysql}
ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-rootpassword}
SHADOW_DB_NAME=${SHADOW_DB_NAME:-vagas_nortejs_shadow}
APP_USER=${APP_USER:-usernortejs}

docker exec "$CONTAINER_NAME" mysql -uroot -p"$ROOT_PASSWORD" -e "
CREATE DATABASE IF NOT EXISTS \`$SHADOW_DB_NAME\`;
GRANT ALL PRIVILEGES ON \`$SHADOW_DB_NAME\`.* TO '$APP_USER'@'%';
FLUSH PRIVILEGES;
"

echo "OK: shadow DB '$SHADOW_DB_NAME' pronto no container '$CONTAINER_NAME'."
