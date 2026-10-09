# 🎯 Medidor de Resenha — Edição 2026

Um quiz interativo para medir o nível de "resenha" de uma pessoa, agora com banco de dados PostgreSQL para armazenar pontuações e ranking!

## 🚀 Funcionalidades

- ✅ 25 perguntas novas (+18), uma por tela, com reação zoeira a cada resposta
- ✅ Opções embaralhadas a cada pergunta (sem decorar a ordem)
- ✅ Resenhômetro™: pontuação de 0 a 100 com ponteiro animado
- ✅ 6 níveis (Poste de Luz com Crachá até Entidade Suprema da Resenha)
- ✅ Laudo técnico por categoria: presença, fofoca, zoeira, rolê e safadeza
- ✅ Ranking separado por edição (o de 2025 continua guardado no banco)
- ✅ **Banco PostgreSQL** para persistência de dados
- ✅ **Ranking em tempo real** com top 10 jogadores
- ✅ **Fallback para localStorage** quando servidor indisponível
- ✅ Interface responsiva e animada
- ✅ Sistema de notificações
- ✅ Easter egg secreto (toque 5x no selo 2026)

## 🛠️ Tecnologias

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Google Fonts (Bricolage Grotesque)

### Backend
- Node.js + Express
- PostgreSQL
- CORS, dotenv

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)
- npm ou yarn

## ⚙️ Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/medidor-resenha.git
cd medidor-resenha
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o PostgreSQL

#### Opção A: Instalação Local
1. Instale o PostgreSQL: https://www.postgresql.org/download/
2. Crie um banco de dados:
```sql
CREATE DATABASE medidor_resenha;
```

#### Opção B: Docker (Recomendado)
```bash
# Executar PostgreSQL em container
docker run --name postgres-medidor \
  -e POSTGRES_DB=medidor_resenha \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=sua_senha \
  -p 5432:5432 \
  -d postgres:15
```

### 4. Configure as variáveis de ambiente

Edite o arquivo `.env`:
```env
# Configurações do Banco PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medidor_resenha
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui

# Porta do servidor
PORT=3000

# Ambiente
NODE_ENV=development
```

### 5. Execute a aplicação

#### Desenvolvimento
```bash
npm run dev
```

#### Produção
```bash
npm start
```

## 🌐 Acesso

- **Aplicação:** http://localhost:3000
- **API Health:** http://localhost:3000/api/health
- **Ranking:** http://localhost:3000/api/ranking

## 📊 API Endpoints

### GET /api/health
Verifica status da API e conexão com banco.

### GET /api/ranking
Retorna top 10 jogadores ordenados por pontuação.

### POST /api/pontuacao
Salva nova pontuação no banco.

**Body:**
```json
{
  "nome": "João Silva",
  "pontuacao": 85
}
```

### GET /api/estatisticas
Retorna estatísticas gerais (total de jogadores, média, etc.).

## 🗄️ Estrutura do Banco

### Tabela: pontuacoes
```sql
CREATE TABLE pontuacoes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  pontuacao INTEGER NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  edicao SMALLINT NOT NULL DEFAULT 2025
);

CREATE INDEX idx_pontuacoes_edicao_pontuacao ON pontuacoes(edicao, pontuacao DESC);
```

A coluna `edicao` é criada automaticamente na inicialização (`ALTER TABLE ... ADD COLUMN IF NOT EXISTS`). Registros antigos ficam como 2025; os novos entram como 2026 e o ranking/estatísticas mostram só a edição atual (constante `EDICAO` em `server.js`).

## 🎮 Como Jogar

1. **Acesse** a aplicação
2. **Digite** seu nome (ou apelido)
3. **Responda** as 25 perguntas (dá pra usar as teclas A-D ou 1-4)
4. **Veja** seu resultado no Resenhômetro™ e o laudo por categoria
5. **Compare** sua pontuação no ranking de 2026

## 🏆 Níveis de Classificação

| Pontos | Nível | Título |
|--------|-------|--------|
| 0-15   | 1     | 🪫 Poste de Luz com Crachá |
| 16-35  | 2     | 🧊 Estraga Resenha Raiz |
| 36-55  | 3     | 🧳 Turista da Resenha |
| 56-72  | 4     | 📈 Resenhudo em Ascensão |
| 73-89  | 5     | 🏛️ Patrimônio da Resenha |
| 90-100 | 6     | 👑 Entidade Suprema da Resenha |

## 🐳 Deploy com Docker

### Opção 1: Docker Compose (Recomendado)

Esta opção usa o PostgreSQL já instalado na VPS e é ideal para deploy em servidor:

```bash
# Iniciar a aplicação
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar aplicação
docker-compose down
```

**Pré-requisitos:**
- PostgreSQL rodando na VPS (localhost:5432)
- Banco `resenha` criado
- Usuário com permissões adequadas
- Arquivo `.env` configurado com as credenciais corretas

**Serviços disponíveis:**
- Aplicação: http://localhost:23498

### Opção 2: Dockerfile apenas

Para usar apenas o Dockerfile:

```bash
# Construir a imagem
docker build -t medidor-resenha .

# Executar com arquivo .env
docker run -d \
  --name medidor-resenha \
  -p 23498:23498 \
  --network host \
  --env-file .env \
  medidor-resenha
```

## ☁️ Deploy na Nuvem

### Vercel (Frontend)
1. Conecte seu repositório no Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Railway/Heroku (Backend + PostgreSQL)
1. Configure as variáveis de ambiente
2. Adicione addon PostgreSQL
3. Deploy automático

## 🎯 Easter Egg

Digite o **Konami Code** para descobrir um segredo:
`↑ ↑ ↓ ↓ ← → ← → B A`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Arthur** - [GitHub](https://github.com/seu-usuario)

---

⭐ **Curtiu o projeto? Deixe uma estrela!** ⭐