-- Somente para banco de testes vazio, após estrutura.sql.
-- Reexecutar não sobrescreve registros já existentes.
INSERT INTO operadores (re,nome,equipe,carreta_fixa,carreta_atual,status) VALUES
(912,'Cláudio Silva','A','125','125','Titular Ativo'),
(913,'Operador Titular 02','A','102','102','Titular Ativo'),
(980,'Operador Reserva 01','A',NULL,NULL,'Reserva'),
(990,'Novo Colaborador 01','A',NULL,NULL,'Em Integração')
ON CONFLICT(re) DO NOTHING;
INSERT INTO carretas (numero,status,observacao) VALUES
('125','Operando','Titular: R.E. 912'),
('102','Operando','Titular: R.E. 913'),
('142','Reserva Pátio','Disponível para cobertura de manutenção')
ON CONFLICT(numero) DO NOTHING;
