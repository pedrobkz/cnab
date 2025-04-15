
FROM node:22-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
  openssl \
  netcat-openbsd \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN chmod +x ./wait-for-db.sh

EXPOSE 4000

CMD ["./wait-for-db.sh"]