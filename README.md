# API Node.js - Gerenciamento de Cursos

API REST desenvolvida em Node.js com TypeScript para gerenciamento de cursos, utilizando Fastify como framework web e Drizzle ORM para interação com banco de dados PostgreSQL.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM type-safe para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de schemas
- **Docker Compose** - Orquestração de containers
- **Swagger/Scalar** - Documentação interativa da API

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositório>
cd api-node-js
```

2. Instale as dependências:
```bash
npm install
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/desafio
NODE_ENV=development
```

2. Inicie o banco de dados PostgreSQL usando Docker Compose:

```bash
docker-compose up -d
```

Isso irá iniciar um container PostgreSQL na porta `5433` com as seguintes credenciais:
- **Usuário**: `postgres`
- **Senha**: `postgres`
- **Database**: `desafio`

## 🗄️ Migrações do Banco de Dados

Após configurar o banco de dados, execute as migrações:

```bash
npm run db:migrate
```

Para gerar novas migrações após alterar o schema:

```bash
npm run db:generate
```

## 🏃 Como Executar

### Modo Desenvolvimento

Execute o servidor em modo de desenvolvimento com hot-reload:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`

### Documentação da API

Quando executado em modo de desenvolvimento, a documentação interativa da API estará disponível em:

- **Scalar API Reference**: `http://localhost:3333/docs`

## 📁 Estrutura do Projeto

```
api-node-js/
├── src/
│   ├── database/
│   │   ├── client.ts          # Cliente do Drizzle ORM
│   │   └── schema.ts          # Schemas das tabelas
│   └── routes/
│       ├── create-couse.ts    # Rota para criar cursos
│       ├── get-course-by-id.ts # Rota para buscar curso por ID
│       └── get-courses.ts     # Rota para listar todos os cursos
├── drizzle/                   # Migrações do banco de dados
├── docker-compose.yml         # Configuração do Docker Compose
├── drizzle.config.ts          # Configuração do Drizzle
├── server.ts                  # Arquivo principal do servidor
├── tsconfig.json              # Configuração do TypeScript
└── package.json               # Dependências e scripts
```

## 🔄 Fluxo da Aplicação

O diagrama abaixo ilustra o fluxo principal de uma requisição na aplicação, desde a chegada da requisição HTTP até a resposta final:

```mermaid
sequenceDiagram
    participant Cliente
    participant Fastify as Fastify Server
    participant Zod as Validador Zod
    participant Rota as Route Handler
    participant Drizzle as Drizzle ORM
    participant PostgreSQL as PostgreSQL DB

    Cliente->>Fastify: HTTP Request (POST /courses)
    Fastify->>Zod: Validação do Schema
    alt Validação Falhou
        Zod-->>Fastify: Erro de Validação
        Fastify-->>Cliente: 400 Bad Request
    else Validação OK
        Zod-->>Fastify: Dados Válidos
        Fastify->>Rota: Chama Handler da Rota
        Rota->>Drizzle: Insert no Banco
        Drizzle->>PostgreSQL: SQL Query
        PostgreSQL-->>Drizzle: Dados Inseridos
        Drizzle-->>Rota: Resultado com ID
        Rota->>Zod: Validação da Resposta
        Zod-->>Rota: Resposta Válida
        Rota-->>Fastify: Resposta 201 Created
        Fastify-->>Cliente: JSON Response
    end
```

### Descrição do Fluxo

1. **Cliente** envia uma requisição HTTP para o servidor Fastify
2. **Fastify** recebe a requisição e encaminha para o validador **Zod**
3. **Zod** valida os dados de entrada conforme o schema definido
4. Se a validação falhar, retorna erro 400; caso contrário, prossegue
5. O **Handler da Rota** processa a requisição validada
6. **Drizzle ORM** executa a operação no banco de dados
7. **PostgreSQL** processa a query e retorna os dados
8. A resposta é validada pelo **Zod** antes de ser retornada
9. O **Cliente** recebe a resposta JSON final

## 📡 Endpoints da API

### Criar Curso

**POST** `/courses`

Cria um novo curso no banco de dados.

**Body:**
```json
{
  "title": "Nome do Curso"
}
```

**Validação:**
- `title`: string com mínimo de 5 caracteres

**Resposta (201):**
```json
{
  "courseId": "uuid-do-curso"
}
```

### Listar Cursos

**GET** `/courses`

Retorna uma lista com todos os cursos cadastrados.

**Resposta (200):**
```json
{
  "courses": [
    {
      "id": "uuid",
      "title": "Nome do Curso"
    }
  ]
}
```

### Buscar Curso por ID

**GET** `/courses/:id`

Retorna os detalhes de um curso específico.

**Parâmetros:**
- `id`: UUID do curso

**Resposta (200):**
```json
{
  "course": {
    "id": "uuid",
    "title": "Nome do Curso",
    "description": "Descrição do curso" // ou null
  }
}
```

**Resposta (404):**
```json
null
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot-reload
- `npm run db:generate` - Gera migrações do banco de dados baseadas no schema
- `npm run db:migrate` - Executa as migrações no banco de dados
- `npm test` - Executa os testes (ainda não implementado)

## 📊 Modelo de Dados

### Tabela: `courses`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único (chave primária) |
| `title` | TEXT | Título do curso (único, obrigatório) |
| `description` | TEXT | Descrição do curso (opcional) |

### Tabela: `users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único (chave primária) |
| `name` | TEXT | Nome do usuário (obrigatório) |
| `email` | TEXT | Email do usuário (único, obrigatório) |

## 🔍 Validação

A API utiliza **Zod** para validação de schemas em tempo de execução. Todos os endpoints validam automaticamente:
- Parâmetros de rota
- Corpo das requisições
- Respostas da API

## 📝 Notas

- O servidor roda na porta `3333` por padrão
- O banco de dados PostgreSQL roda na porta `5433` (mapeada do container)
- A documentação Swagger/Scalar só está disponível em modo de desenvolvimento
- O projeto utiliza ES Modules (`"type": "module"`)

## 📄 Licença

ISC

