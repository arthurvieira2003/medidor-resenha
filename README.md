# 🎯 Medidor de Resenha

Um quiz interativo para medir o nível de "resenha" de uma pessoa, agora com banco de dados PostgreSQL para armazenar pontuações e ranking!

## 🚀 Funcionalidades

- ✅ Quiz interativo com 7 páginas e 34 perguntas
- ✅ Sistema de pontuação de 0 a 100 pontos
- ✅ 5 níveis de classificação (Estraga Resenha até Mestre da Resenha)
- ✅ **Banco PostgreSQL** para persistência de dados
- ✅ **Ranking em tempo real** com top 10 jogadores
- ✅ **Fallback para localStorage** quando servidor indisponível
- ✅ Interface responsiva e animada
- ✅ Sistema de notificações
- ✅ Easter egg secreto (Konami Code)

## 🛠️ Tecnologias

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Font Awesome para ícones
- Google Fonts (Poppins)

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
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pontuacoes_pontuacao ON pontuacoes(pontuacao DESC);
```

## 🎮 Como Jogar

1. **Acesse** a aplicação
2. **Responda** as 34 perguntas sobre "resenha"
3. **Navegue** pelas 7 páginas do quiz
4. **Insira** seu nome ao final
5. **Veja** seu resultado e classificação
6. **Compare** sua pontuação no ranking

## 🏆 Níveis de Classificação

| Pontos | Nível | Título |
|--------|-------|--------|
| 0-33   | 1     | Estraga Resenha |
| 34-50  | 2     | Analisando Possível Resenha |
| 51-67  | 3     | Resenhudo Intermediário |
| 68-83  | 4     | Resenhudo Avançado |
| 84-100 | 5     | Mestre da Resenha |

## 🐳 Deploy com Docker

### Dockerfile
```bash
# Build da imagem
docker build -t medidor-resenha .

# Executar container
docker run -p 23498:23498 --env-file .env medidor-resenha

# Ou com variáveis de ambiente inline
docker run -p 23498:23498 \
  -e DB_HOST=seu_host_postgres \
  -e DB_NAME=medidor_resenha \
  -e DB_USER=postgres \
  -e DB_PASSWORD=sua_senha \
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