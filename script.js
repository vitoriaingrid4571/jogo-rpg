const PL=['Harlow','Oklahoma','Arkansas','Tennessee','Blackwell'];
let st,cur,fase;
const reset=()=>{st={d:6,s:2,k:1,l:0};show('start')};
const bar=n=>'●'.repeat(Math.max(0,n))+'○'.repeat(Math.max(0,5-n));

const G={
start:{t:[`Um apocalipse não termina com um estrondo. Termina com um rádio que para de chiar.`,`Você é Harry, xerife de Harlow, Texas. Sua filha Maggie está internada em Blackwell, Ohio, a 1.800 km de distância, e o sangue dela pode ser a cura de tudo.`],b:'Começar a viagem',n:'f1',title:1},

f1:{f:0,p:'Harlow, Texas. Dia 1.',t:[`O último contato com Blackwell chegou às quatro da manhã. A voz era do Dr. Okafor: o sangue da Maggie é RH null, sem nenhum antígeno Rh, e o vírus não consegue se agarrar a ele. Dá para fazer um soro com o plasma dela. Mas o laboratório do hospital só tem energia para seis dias, e a Maggie é fraca demais para doar sem alguém que possa estabilizá-la.`,`Esse alguém é você: pai dela, portador do mesmo gene raro. Seis dias, uma picape da delegacia e 1.800 km de estrada.`],
c:[[`Pegar a rodovia 287, a mais rápida`,`A estrada está limpa nas primeiras horas, e você ganha tempo. Mas o tanque seca mais rápido do que o previsto.`,{s:-1}],[`Ir por estradas vicinais, mais lentas`,`Você perde horas em cascalho e desvios, mas enche a caçamba de suprimentos de uma fazenda abandonada.`,{d:-1,s:1}]],n:'f2'},

f2:{f:1,p:'Oklahoma. Dia 2.',t:[`A noite cai sobre um posto de gasolina que parece vazio. As bombas ainda têm combustível. No escuro, algo se arrasta entre as prateleiras.`,`Você sabe que um tanque cheio vale um dia inteiro de estrada.`],
c:[[`Abastecer sem fazer barulho`,`Cada gota é bombeada devagar. Algo passa a menos de três metros de você, e não olha para cima. O tanque enche.`,{s:1}],[`Seguir viagem no escuro, sem arriscar`,`Você segue com o tanque pela metade, mas sem um arranhão, e dorme duas horas num viaduto.`,{k:0}]],n:'f3'},

f3:{f:2,p:'Arkansas. Dia 3.',t:[`Num posto de pedágio abandonado, você acha um rádio amador de pé. Gira o dial por horas, até que, entre o chiado, uma voz minúscula surge.`,`<div class="radio">“Pai? Pai, é a Maggie. Tem um moço aqui, o Kaul, ele é segurança do hospital. Ele disse que o senhor consegue me ouvir se eu repetir.”</div>`,`<div class="radio">Kaul: “Xerife, ouvi falar do senhor. A entrada de carga, no lado leste, é a única que ainda abre por dentro. Se chegar antes do dia 6, eu abro. Mas preciso saber se o senhor vai mesmo chegar.”</div>`],
c:[[`Prometer que vai chegar, custe o que custar`,`Maggie ri e chora no mesmo chiado. O Kaul fica em silêncio, e depois diz: “Então eu espero.”`,{k:1}],[`Dizer a verdade: está difícil, mas vai tentar`,`O Kaul respira fundo. “Honestidade é o que eu precisava ouvir.” Ele passa a confiar em você.`,{k:2}]],n:'f4'},

f4:{f:3,p:'Tennessee. Dia 4.',t:[`Numa ponte caída, você acampa e liga o rádio de novo. A Maggie demora para falar.`,`<div class="radio">“Pai, preciso contar uma coisa. A mamãe morreu. Faz doze dias. Ela ficou aqui comigo até o fim, e me pediu para não contar até o senhor chegar, para o senhor não parar de dirigir.”</div>`,`Ester. Doze dias de silêncio, e você achando que ela esperava em casa. O motor esfria ao seu lado. O rio corre lá embaixo.`],
c:[[`Parar por uma hora e deixar o luto sair`,`Você chora sobre o volante até a voz acabar. Quando liga o motor de novo, a dor continua, mas agora cabe no peito.`,{d:-1,l:1}],[`Continuar dirigindo, em silêncio`,`O asfalto passa embaixo dos pneus. Você não diz uma palavra por seiscentos quilômetros. A dor viaja no banco do carona.`,{l:0}]],n:'f5'},

f5:{f:4,p:'Blackwell, Ohio. Dia 5.',t:[`O hospital aparece de madrugada, cercado por uma multidão lenta de infectados. A entrada de carga, a leste, está a duzentos metros, depois de um estacionamento cheio de carros mortos.`,`No rádio, o Kaul fala baixo: “Estou na porta. Diga quando.”`],
c:[[`Atravessar o estacionamento a pé, sem fazer ruído`,`Cada passo é um segundo de eternidade. Você chega à porta pelo vão entre dois caminhões, e o Kaul puxa você para dentro.`,{s:-1}],[`Buzinar para atrair a horda e dar a volta`,`A buzina atrai tudo para o oeste. Você sacrifica a picape, e chega à porta correndo, sem nada nas mãos.`,{s:-1,d:-0}]],n:'lab'},

lab:{f:4,p:'Laboratório. Dia 6.',t:[`O Dr. Okafor está exausto, mas sorri. A Maggie está na maca, pálida, com os olhos abertos. “Papai”, ela diz, e você esquece de todo o resto.`,`O procedimento leva horas: o plasma dela será separado para fazer o soro, e o seu sangue vai mantê-la de pé enquanto isso. O gerador falha duas vezes. O Kaul segura uma lanterna com as duas mãos e não treme.`,`Quando o primeiro frasco fica pronto, o Dr. Okafor olha para você: “O resto depende do quanto o senhor ainda aguenta dar.”`],
c:[[`Dar tudo o que puder, até onde o corpo permitir`,`Você sente o mundo ficar longe, mas não solta a mão dela.`,{s:-1}],[`Dar o necessário e guardar forças para o dia seguinte`,`O processo fica mais lento, mas você continua em pé.`,{d:-1}]],n:()=>{const sc=st.d+st.s+st.k;return sc>=5?'e1':sc>=3?'e2':'e3'}},

e1:{end:1,t:`Aurora`,x:[`O soro é aplicado nos primeiros doentes ao amanhecer. Na janela do hospital, o sol nasce sobre Blackwell, e pela primeira vez em meses o rádio tem outra coisa além de chiado: vozes de cidades vizinhas, perguntando como fazer o mesmo.`,`Maggie dorme com a mão no braço do pai. O Kaul traz café para os três. Você ${'${L}'}`]},
e2:{end:1,t:`O preço da estrada`,x:[`A cura sai do laboratório, mas o gerador não aguenta mais um dia. O Dr. Okafor e o Kaul levam os frascos que restam a pé para o norte, enquanto você fica ao lado da Maggie.`,`Ela vai se recuperar. Você, nem tanto: o sangue que deu e os quilômetros viraram uma fraqueza que não passa. Mas a cura existe, e está viajando sem você. Você ${'${L}'}`]},
e3:{end:1,t:`Um fio de luz`,x:[`A energia cai no meio do procedimento. No escuro, o Kaul abre uma caixa térmica: ele havia guardado, dias antes, uma única amostra do plasma da Maggie, protegida do frio e do calor.`,`É pouco, mas é o suficiente para recomeçar a cura em outro lugar. Vocês saem pelos fundos, os três, com a amostra no colo da Maggie. A estrada continua. Você ${'${L}'}`]}
};

function stats(){
  d.textContent=Math.max(0,st.d);s.textContent=bar(st.s);k.textContent=bar(st.k);
  route.innerHTML=PL.map((n,i)=>`<li class="${i<fase?'done':i===fase?'now':''}"><i></i>${n}</li>`).join('');
}
function show(id,res){
  cur=G[id];fase=cur.f??fase??0;
  if(id==='start'){fase=-1}
  stats();
  let h='';
  if(cur.end){
    const L=st.l?'carrega a Ester contigo, com o luto que você escolheu viver: sem pressa, sem esconder.':'segue em frente com a Ester dentro do silêncio, e um dia vai aprender a falar dela.';
    h=`<div class="end"><h2>${cur.t}</h2><div class="story">${cur.x.map(p=>`<p>${p.replace('${L}',L)}</p>`).join('')}</div></div><div class="opts"><button id="re">Jogar de novo e tentar outro caminho</button></div>`;
    view.innerHTML=h;re.onclick=reset;scrollTo(0,0);return;
  }
  if(cur.title)h+=`<h1>Harry</h1>`;
  if(cur.p)h+=`<p class="place">${cur.p}</p>`;
  h+=`<div class="story">${cur.t.map(p=>p.startsWith('<div')?p:`<p>${p}</p>`).join('')}</div>`;
  h+=`<div class="opts" id="o">`+(cur.c?cur.c.map((c,i)=>`<button data-i="${i}">${c[0]}</button>`).join(''):`<button data-i="go">${cur.b}</button>`)+`</div>`;
  view.innerHTML=h;scrollTo(0,0);
  o.onclick=e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.i==='go')return show(cur.n);
    const c=cur.c[b.dataset.i],dl=c[2]||{};
    st.d+=dl.d||0;st.s=Math.max(0,Math.min(5,st.s+(dl.s||0)));st.k=Math.max(0,Math.min(5,st.k+(dl.k||0)));
    if('l' in dl)st.l=dl.l;
    stats();
    const nx=typeof cur.n==='function'?cur.n():cur.n;
    o.innerHTML=`<p class="res">${c[1]}</p><button id="cn">Continuar</button>`;
    cn.onclick=()=>show(nx);cn.focus();
  };
}
th.onclick=()=>{const r=document.documentElement;const dark=getComputedStyle(r).getPropertyValue('--bg').trim()==='#15130f';r.dataset.theme=dark?'light':'dark'};
const $=id=>document.getElementById(id);
const d=$('d'),s=$('s'),k=$('k'),route=$('route'),view=$('view'),th=$('th');
reset();
