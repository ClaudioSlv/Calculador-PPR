# Cadastro e distribuição — prévia privada

Entrada: `/previa-operadores/gestao`, sob a autenticação já existente da prévia. O app público mantém seu comportamento. Nunca remover esse bloqueio antes de uma liberação expressa.

## Comportamento

- Cadastro por R.E., nome, equipe, função e senha; operador informa carreta fixa.
- Todas as funções começam pendentes. Claudio usa a senha da prévia no painel inicial para aprovar os primeiros responsáveis, sem assumir uma função operacional.
- Supervisores e Facilitadores aprovam cadastros, inclusive responsáveis, somente da própria equipe. Operadores consultam a própria equipe e solicitam sua mudança de equipe.
- Mudanças de equipe suspendem o acesso imediatamente, removem a carreta fixa anterior e exigem aprovação do destino. Bloqueio e remoção invalidam o acesso nas próximas requisições, mesmo com uma sessão já aberta.
- A frota e a manutenção são globais; listas pessoais são filtradas no servidor. A auditoria compartilhada da frota não identifica gestores de outras equipes.
- Distribuição determinística por data, horário da escala existente, titularidade, ausências e R.E. Não atribui uma carreta duas vezes no mesmo turno. Permite seu uso em turnos diferentes. O retorno à fixa é recalculado quando ela volta a operar.
- Lista atualiza ao abrir, retomar o app ou tocar em atualizar. PDF contém somente a equipe autorizada. A previsão futura usa a disponibilidade atual da frota.

## Dados e implantação

`schema.sql` cria somente tabelas `mt_preview_*` no binding D1 `TROCAS`; não altera tabelas do mural. O registro de teste contém inicialmente apenas as carretas de demonstração 125, 102 e 142, sem contas preaprovadas.

O estado de teste é atualizado por comparação de revisão (CAS) para serializar alterações concorrentes. Senhas usam PBKDF2-SHA256 com sal aleatório e 100.000 iterações; sessões são aleatórias, armazenadas por hash e enviadas em cookies Secure/HttpOnly. As autorizações são reavaliadas no servidor. Tentativas de autenticação têm limite por janela. Logs da prévia mantêm as últimas 600 alterações. Não há envio de mensagens ou notificações.

A implantação inclui `worker.mjs`, `preview/colaboradores.mjs` e `preview/schedule.mjs`. Preserve as demais configurações, segredos e bindings. O HTML fonte em `colaboradores.html` corresponde ao `PAGE` incorporado no módulo; atualize ambos quando editar a interface.

Testes: `node --test preview/colaboradores.test.mjs` (Node 24; SQLite incluído). Cobrem permissões, bootstrap, transferência, bloqueio, isolamento, disponibilidade global, conflitos no turno, ausência, retorno e sintaxe do cliente.

Esta fase serve para testes privados. Antes de abrir aos colaboradores, definir a recuperação de senha e carregar a relação real de pessoas e carretas, conferindo a escala usada para a distribuição. Não reutilizar contas de demonstração como cadastros reais.
