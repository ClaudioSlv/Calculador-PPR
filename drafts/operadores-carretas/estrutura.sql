-- RASCUNHO: SQLite / Cloudflare D1. Não aplicado ao banco.
-- Datas: YYYY-MM-DD; exemplos ficam em exemplos.sql.
CREATE TABLE IF NOT EXISTS operadores (
 re INTEGER PRIMARY KEY,
 nome TEXT NOT NULL,
 equipe TEXT NOT NULL DEFAULT 'A',
 carreta_fixa TEXT,
 carreta_atual TEXT,
 status TEXT NOT NULL DEFAULT 'Titular Ativo',
 ferias_inicio TEXT,
 ferias_fim TEXT,
 cobrindo_re INTEGER
);
CREATE TABLE IF NOT EXISTS carretas (
 numero TEXT PRIMARY KEY,
 status TEXT NOT NULL DEFAULT 'Operando',
 observacao TEXT
);
