# 💳 CNAB Parser - Upload, Processamento e Visualização de Transações

Este projeto é uma aplicação fullstack para upload e processamento de arquivos CNAB. Após o envio do arquivo, ele é processado no backend, persistido em um banco de dados PostgreSQL, e então os dados ficam disponíveis para consulta via frontend.

## 📁 Estrutura do Projeto

```
projeto/
├── backend/ → API em Fastify + Prisma
├── frontend/ → Webapp em React + Vite
├── docker-compose/ → Configuração do PostgreSQL e backend
```

## ⚙️ Tecnologias Utilizadas

### Backend
- **Node.js 22+**
- **Fastify** (framework HTTP)
- **Prisma ORM**
- **PostgreSQL** (via Docker)
- **Jest** (testes)

### Frontend
- **React 19**
- **Vite**
- **TypeScript**
- **Vitest + Testing Library**

---

## 📦 Funcionalidades

- Upload de arquivo `.txt` no formato CNAB.
- Parse e armazenamento das transações no banco.
- Cálculo do saldo por loja.
- Listagem das lojas e suas respectivas transações no frontend.

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Docker + Docker Compose
- Node.js (v22+) e npm (apenas para o frontend)

### 1. Subindo o Backend e o Banco

A partir da raiz do projeto, rode:

```bash
docker-compose up --build

Isso irá:

Subir o banco PostgreSQL

Rodar as migrações com o Prisma

Iniciar o servidor Fastify
```

### 2. Rodando o Frontend

Abra um novo terminal na pasta frontend/:

```bash
npm install

npm run dev
```

## 🧪 Testes

### Backend

```bash
npm run test
```

### Frontend

```bash
npm run test
```

## 📂 Outras Observações

- A pasta migrations/ do Prisma está versionada para garantir controle do schema.

- O frontend é desacoplado e se comunica com a API via axios.



