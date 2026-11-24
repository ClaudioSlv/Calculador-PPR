// Rascunho isolado: não conectado ao app ou a banco de produção.
// Datas civis YYYY-MM-DD. ferias_fim é o último dia de férias.
function dataValida(valor) {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(valor || '')) throw Error('Data inválida.');
 const d = new Date(valor+'T00:00:00Z');
 if (!Number.isFinite(d.getTime()) || d.toISOString().slice(0,10)!==valor) throw Error('Data inválida.');
 return d;
}
function somarDias(data,dias) {
 const d=dataValida(data); d.setUTCDate(d.getUTCDate()+dias);
 return d.toISOString().slice(0,10);
}
export function programarFerias(base,re,inicio,dias) {
 dataValida(inicio);
 if (![20,30].includes(dias)) throw Error('Informe 20 ou 30 dias.');
 const next=structuredClone(base), titular=next.operadores.find(o=>o.re===re);
 if (!titular || !titular.carreta_fixa) throw Error('Titular sem carreta fixa.');
 const fim=somarDias(inicio,dias-1);
 next.ferias ||= [];
 if (next.ferias.some(f=>f.re===re && f.inicio<=fim && f.fim>=inicio))
  throw Error('Já existem férias nesse período.');
 next.ferias.push({re,inicio,fim,reserva_re:null,estado:'Agendadas'});
 return next;
}
export function atualizarFerias(base,hoje) {
 dataValida(hoje);
 const next=structuredClone(base); next.ferias ||= [];
 const operador=re=>next.operadores.find(o=>o.re===re);
 for(const f of next.ferias) {
  if(f.estado==='Encerradas' || f.fim>=hoje || f.estado==='Agendadas') continue;
  const t=operador(f.re), r=operador(f.reserva_re);
  // Só desfaz a alocação que ainda pertence a esta cobertura.
  if(r && r.cobrindo_re===f.re) {
   r.cobrindo_re=null; r.carreta_atual=null;
   if(r.status==='Cob. Férias') r.status='Reserva';
  }
  if(t && t.status==='Férias') {
   const carreta=next.carretas.find(c=>c.numero===t.carreta_fixa);
   const ocupada=next.operadores.some(o=>o.re!==t.re && o.carreta_atual===t.carreta_fixa);
   t.status=carreta?.status==='Operando'&&!ocupada?'Titular Ativo':'Manutenção';
   t.carreta_atual=t.status==='Titular Ativo'?t.carreta_fixa:null;
   t.ferias_inicio=null; t.ferias_fim=null;
  }
  f.estado='Encerradas';
 }
 for(const f of [...next.ferias].sort((a,b)=>a.inicio.localeCompare(b.inicio)||a.re-b.re)) {
  if(f.estado==='Encerradas')continue;
  if(f.fim<hoje){f.estado='Encerradas';continue;}
  if(f.inicio>hoje)continue;
  const t=operador(f.re);
  if(!t)throw Error('Titular não encontrado.');
  t.status='Férias';t.carreta_atual=null;
  t.ferias_inicio=f.inicio;t.ferias_fim=f.fim;
  if(f.reserva_re!==null)continue;
  const carreta=next.carretas.find(c=>c.numero===t.carreta_fixa);
  const ocupada=next.operadores.some(o=>o.re!==t.re&&o.carreta_atual===t.carreta_fixa);
  if(!carreta || carreta.status!=='Operando'||ocupada){f.estado='Cobertura pendente';continue;}
  const reservas=next.operadores.filter(o=>
   o.re!==t.re && o.equipe===t.equipe && o.status==='Reserva' &&
   !o.carreta_fixa && !o.carreta_atual && !o.cobrindo_re &&
   !next.ferias.some(a=>a.re===o.re&&a.estado!=='Encerradas'&&a.inicio<=f.fim&&a.fim>=hoje)
  ).sort((a,b)=>a.re-b.re);
  const r=reservas[0];
  if(!r){f.estado='Cobertura pendente';continue;}
  r.status='Cob. Férias';r.carreta_atual=t.carreta_fixa;r.cobrindo_re=t.re;
  f.reserva_re=r.re;f.estado='Em cobertura';
 }
 return next;
}
