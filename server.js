const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const EDICAO = 2026;

// Configuração do PostgreSQL (DATABASE_URL tem prioridade, ex.: Neon/Render)
const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }
);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// Função para inicializar o banco de dados
async function initializeDatabase() {
  try {
    // Verifica se a tabela existe, se não existir, cria
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS pontuacoes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        pontuacao INTEGER NOT NULL,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createTableQuery);
    console.log('✅ Tabela "pontuacoes" verificada/criada com sucesso!');

    // Separa os rankings por ano; registros antigos ficam como edição 2025
    await pool.query(
      "ALTER TABLE pontuacoes ADD COLUMN IF NOT EXISTS edicao SMALLINT NOT NULL DEFAULT 2025;"
    );

    // Criar índice para melhor performance nas consultas
    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_pontuacoes_edicao_pontuacao
      ON pontuacoes(edicao, pontuacao DESC);
    `;

    await pool.query(createIndexQuery);
    console.log("✅ Índice criado para otimização de consultas!");
  } catch (error) {
    console.error("❌ Erro ao inicializar banco de dados:", error);
    process.exit(1);
  }
}

// Rota para salvar pontuação
app.post("/api/pontuacao", async (req, res) => {
  try {
    const nome = typeof req.body.nome === "string" ? req.body.nome.trim() : "";
    const { pontuacao } = req.body;

    if (!nome || !Number.isInteger(pontuacao)) {
      return res.status(400).json({
        error: "Nome e pontuação são obrigatórios",
      });
    }

    if (nome.length > 100) {
      return res.status(400).json({
        error: "Nome deve ter no máximo 100 caracteres",
      });
    }

    if (pontuacao < 0 || pontuacao > 100) {
      return res.status(400).json({
        error: "Pontuação deve estar entre 0 e 100",
      });
    }

    const insertQuery = `
      INSERT INTO pontuacoes (nome, pontuacao, edicao)
      VALUES ($1, $2, $3)
      RETURNING id, nome, pontuacao, data_criacao;
    `;

    const result = await pool.query(insertQuery, [nome, pontuacao, EDICAO]);

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "Pontuação salva com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao salvar pontuação:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

// Rota para buscar ranking (top 10)
app.get("/api/ranking", async (req, res) => {
  try {
    const rankingQuery = `
      SELECT nome, pontuacao, data_criacao
      FROM pontuacoes
      WHERE edicao = $1
      ORDER BY pontuacao DESC, data_criacao ASC
      LIMIT 10;
    `;

    const result = await pool.query(rankingQuery, [EDICAO]);

    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length,
    });
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

// Rota para buscar estatísticas
app.get("/api/estatisticas", async (req, res) => {
  try {
    const statsQuery = `
      SELECT 
        COUNT(*) as total_jogadores,
        ROUND(AVG(pontuacao), 2) as media_pontuacao,
        MAX(pontuacao) as maior_pontuacao,
        MIN(pontuacao) as menor_pontuacao
      FROM pontuacoes
      WHERE edicao = $1;
    `;

    const result = await pool.query(statsQuery, [EDICAO]);

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
    });
  }
});

// Rota para servir o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rota para verificar saúde da API
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: "Connected",
  });
});

// Inicializar servidor
async function startServer() {
  try {
    // Inicializar banco de dados
    await initializeDatabase();

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

// Tratamento de erros não capturados
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Encerrando servidor...");
  await pool.end();
  process.exit(0);
});

// Iniciar aplicação
startServer();
