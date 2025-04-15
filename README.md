# 💳 CNAB - Upload, Processamento e Visualização de Transações

Este projeto é uma aplicação de teste fullstack para upload e processamento de arquivos CNAB da Bycoders_. Após o envio do arquivo, ele é processado no backend, persistido em um banco de dados PostgreSQL, e então os dados ficam disponíveis para consulta via frontend.

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

### Endpoints da API
```bash
POST /upload-file

Faz o upload de um arquivo CNAB no formato .txt. Após o processamento, os dados são persistidos no banco.

Requisição:
Tipo: multipart/form-data
Campo: file

Resposta:
{
  "message": "Arquivo processado com sucesso!"
}
```

```bash
GET /list-stores

Lista todas as lojas encontradas no arquivo CNAB processado.

Resposta:
[
  {
    "id": 121,
    "name": "BAR DO JOÃO",
    "owner": "JOÃO MACEDO",
    "totalTransactionsValue": -102
  }
]
```

```bash
GET /stores/:id/transactions

Lista todas as transações de uma loja específica, com base no storeId passado como parâmetro na URL. Também retorna o saldo da loja.

Exemplo de requisição:
GET /stores/121/transactions

Resposta:
{
  "balance": 102,
  "transactions": [
    {
      "id": 1090,
      "type": "Financiamento",
      "date": "01/03/2019",
      "value": -142,
      "document": "09620676017",
      "card": "4753****3153",
      "time": "15:34:53",
      "storeId": 121,
      "store": {
        "id": 121,
        "name": "BAR DO JOÃO",
        "owner": "JOÃO MACEDO"
      },
      "nature": "Saída"
    }
  ]
}
```

```bash
GET /transactions

Retorna todas as transações registradas, independente da loja.

Resposta:
[
  {
    "id": 1106,
    "type": "4",
    "date": "01/06/2019",
    "value": "506.17",
    "document": "84515254073",
    "card": "1234****2231",
    "time": "10:00:00",
    "storeId": 123,
    "store": {
      "id": 123,
      "name": "MERCADO DA AVENIDA",
      "owner": "MARCOS PEREIRA"
    }
  }
]
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



