-- Tabelas exclusivas da prévia. Não altera o mural nem cadastros reais.
CREATE TABLE IF NOT EXISTS mt_preview_state(id INTEGER PRIMARY KEY CHECK(id=1),revision INTEGER NOT NULL DEFAULT 0,data TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS mt_preview_sessions(token_hash TEXT PRIMARY KEY,member_id TEXT NOT NULL,expires INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS mt_preview_sessions_expiry ON mt_preview_sessions(expires);
CREATE TABLE IF NOT EXISTS mt_preview_limits(key TEXT NOT NULL,bucket INTEGER NOT NULL,n INTEGER NOT NULL,PRIMARY KEY(key,bucket));
INSERT OR IGNORE INTO mt_preview_state(id,revision,data) VALUES(1,0,'{"people":[],"trucks":[{"number":"125","status":"Operando"},{"number":"102","status":"Operando"},{"number":"142","status":"Operando"}],"absences":[],"audit":[]}');
