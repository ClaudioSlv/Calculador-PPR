# Operadores e carretas — rascunho
Não publicado no app e não executado em banco remoto. Esta pasta não integra a sequência de migrations de produção.

estrutura.sql mantém os campos propostos. exemplos.sql contém quatro operadores e três carretas de demonstração. Datas devem usar YYYY-MM-DD. Não usar os nomes fictícios como cadastro real.

Antes da integração:
- Definir status permitidos e transições.
- Validar referências de carreta fixa, atual e operador coberto.
- Impedir cobertura do próprio operador, coberturas simultâneas conflitantes e alocação duplicada de carreta no mesmo turno.
- Definir férias, substituições, manutenção e devolução ao titular.
- Definir permissões administrativas e histórico das alterações.
- Criar telas e testar em banco isolado antes de publicar.
