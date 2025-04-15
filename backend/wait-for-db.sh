#!/bin/sh

echo "Aguardando banco de dados..."

until nc -z db 5432; do
  sleep 1
done

echo "Banco de dados está pronto! Executando Prisma..."

npx prisma db push
npm run build
exec node dist/server.js