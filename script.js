// Medidor de Resenha — Edição 2026
const STORAGE_KEY = "medidor-resenha-2026";

const CATEGORIAS = {
  presenca: "🎤 Presença de palco",
  fofoca: "👀 Radar de fofoca",
  zoeira: "🤡 Nível de zoeira",
  role: "🍻 Disposição pro rolê",
  safadeza: "🔥 Índice de safadeza",
};

// Cada opção: [pontos 0-3, texto, reação]
const PERGUNTAS = [
  {
    emoji: "🚗", cat: "zoeira",
    texto: "O Petini começa a falar do Nissan Sentra dele pela 47ª vez. Você:",
    opcoes: [
      [0, "Escuto com atenção. Vai que dessa vez tem informação nova.", "Paciência de monge 🧘"],
      [1, "Balanço a cabeça e penso na janta.", "Concordar sem ouvir: técnica milenar"],
      [2, "Pergunto se o Sentra vem com toca-fitas de fábrica.", "Provocação nível 1 😏"],
      [3, "Gero com IA um comercial do Petini vendendo o Sentra no Mercado Livre.", "Ele vai discordar. \"NÃO!\" 🚫"],
    ],
  },
  {
    emoji: "🤮", cat: "role",
    texto: "Qual foi o seu maior vexame de bebedeira?",
    opcoes: [
      [0, "Nunca passei do segundo copo.", "Fígado intacto, alma vazia"],
      [1, "Dormi no sofá da festa.", "Clássico. Respeitável."],
      [2, "Mandei \"oi, sumida\" pra ex às 3h da manhã.", "Visualizou e não respondeu 💔"],
      [3, "Acordei sem um sapato, abraçado num cone de trânsito e sem lembrar de nada.", "Lenda urbana em carne e osso 🚧"],
    ],
  },
  {
    emoji: "🤓", cat: "zoeira",
    texto: "Você começa a explicar uma coisa pro Nicolas e ele já solta: \"já sei\". Você:",
    opcoes: [
      [0, "Paro de explicar. Se ele disse que sabe, sabe.", "Confiança cega (literalmente) 🙈"],
      [1, "Explico de novo, bem devagar.", "Paciência de professor de pré 🖍️"],
      [2, "Peço: \"então explica aí pra mim\".", "Xeque-mate em um lance ♟️"],
      [3, "Deixo ele implementar no SE Suite e já preparo a pipoca pro bug.", "Spoiler: virou bug 🐛"],
    ],
  },
  {
    emoji: "💃", cat: "safadeza",
    texto: "Você entrou num puteiro. \"Só pra conhecer\", claro. Qual é a sua?",
    opcoes: [
      [0, "Peço uma água e fico olhando o relógio.", "Visita técnica sem compromisso 📋"],
      [1, "Tomo uma cerveja e desabafo sobre a vida com a moça.", "Terapia com nota fiscal 🛋️"],
      [2, "Pago umas rodadas e viro amigo do DJ.", "Já tá com nome na lista VIP 🎧"],
      [3, "Saio de lá com cartão fidelidade e o garçom me chamando pelo nome.", "Cliente diamante 💎"],
    ],
  },
  {
    emoji: "🎙️", cat: "presenca",
    texto: "Qual a duração média dos seus áudios no WhatsApp?",
    opcoes: [
      [0, "Não mando áudio. Texto formal, com ponto final.", "Ponto final no zap é agressão 😬"],
      [1, "Até 30 segundos, direto ao ponto.", "Objetivo demais pra ser resenhudo"],
      [2, "Uns 2 minutos, com introdução e conclusão.", "Um TCC por áudio. Respeito."],
      [3, "Podcast. Tem pausa dramática e \"peraí que vou mudar de lugar\".", "O Spotify quer te contratar 🎧"],
    ],
  },
  {
    emoji: "💸", cat: "role",
    texto: "O Lucas olha o cardápio e solta: \"tá caro, né cara...\". Era um pão de queijo de R$ 4. Você:",
    opcoes: [
      [0, "Concordo. Tá tudo caro mesmo.", "Contaminado pela muquiranagem 🪙"],
      [1, "Pago o meu e finjo que não ouvi.", "Neutralidade suíça 🇨🇭"],
      [2, "Ofereço parcelar em 3x sem juros.", "Consultoria financeira grátis 📊"],
      [3, "Abro uma vaquinha online \"Ajude o Lucas a comer\" com meta de R$ 4,00.", "Rico de dinheiro, pobre de pão de queijo 🧀"],
    ],
  },
  {
    emoji: "👕", cat: "fofoca",
    texto: "Seu amigo some com alguém na festa e volta 20 minutos depois com a camisa do avesso. Você:",
    opcoes: [
      [0, "Nem reparo. Cada um com a sua vida.", "Discrição de cofre suíço 🔒"],
      [1, "Dou um sorrisinho e fico quieto.", "Sabe, mas não fala. Por enquanto."],
      [2, "Pergunto \"e aí, como foi?\" na frente de todo mundo.", "Coletiva de imprensa improvisada 🎙️"],
      [3, "Já anunciei no grupo antes dele voltar, com foto da camisa.", "Furo jornalístico 🗞️"],
    ],
  },
  {
    emoji: "🗑️", cat: "zoeira",
    texto: "O Vitinho roda um DELETE sem WHERE e apaga o banco de produção. Qual é a sua?",
    opcoes: [
      [0, "Ajudo a restaurar o backup em silêncio. Isso é sério.", "Profissional demais pra este teste"],
      [1, "Mando um \"força, campeão\" no privado.", "Apoio emocional básico 🫂"],
      [2, "Seguro o riso até ele sair da sala.", "Autocontrole digno de Oscar 🏆"],
      [3, "Imprimo o comando, emolduro e penduro na parede.", "Cuidado: ele é baixinho, mas chifra 🐂"],
    ],
  },
  {
    emoji: "🏩", cat: "safadeza",
    texto: "Motel. Você é do tipo que:",
    opcoes: [
      [0, "Nunca fui. Isso é coisa de novela.", "Nem na novela das 9? 📺"],
      [1, "Pega a suíte mais barata e não encosta em nada.", "Pernoite modo Lucas 🪙"],
      [2, "Pede o cardápio inteiro e estreia a hidro.", "Aproveitando cada centavo 🛁"],
      [3, "É chamado pelo nome na recepção e já tem suíte favorita.", "Sócio-torcedor do motel 🏩"],
    ],
  },
  {
    emoji: "😴", cat: "zoeira",
    texto: "Você flagra o Caetano cochilando sentado, em pleno turno. Você:",
    opcoes: [
      [0, "Deixo ele dormir. Coitado, deve estar cansado.", "Coração mole demais 🥺"],
      [1, "Dou um cutucão discreto antes que alguém veja.", "Anjo da guarda do chimpas 😇"],
      [2, "Tiro uma foto pro acervo pessoal.", "Arquivo confidencial salvo 📁"],
      [3, "Chamo o Maurício pra repetir o flagra e gravo a cena.", "Reprise do clássico 🎬"],
    ],
  },
  {
    emoji: "🎤", cat: "presenca",
    texto: "Karaokê, 2h da manhã. Qual é a sua?",
    opcoes: [
      [0, "Não canto. Fico segurando as bolsas e os casacos.", "Cabideiro oficial 🧥"],
      [1, "Uma do Legião, baixinho, lá no fundo.", "Tímido, mas com bom gosto"],
      [2, "\"Evidências\" em dueto, com drama e mão no peito.", "O Brasil inteiro sabe essa 🇧🇷"],
      [3, "Subo na mesa e canto \"Garçom\" do Reginaldo Rossi chorando de verdade.", "Prêmio Multishow de bêbado 🏆"],
    ],
  },
  {
    emoji: "👴", cat: "fofoca",
    texto: "O Petini começa: \"Quando eu trabalhava na Ambev...\". Você:",
    opcoes: [
      [0, "Puxo uma cadeira. Vai demorar.", "Assinante do podcast do Petini 🎙️"],
      [1, "Lembro de uma reunião urgente que não existe.", "Fuga tática 🏃"],
      [2, "Completo antes dele: \"...e na Thomson também\".", "Já decorou o roteiro 📜"],
      [3, "Solto um \"ué, xoven\" antes dele e roubo o bordão.", "Roubo de bordão à mão armada 😂"],
    ],
  },
  {
    emoji: "🥂", cat: "safadeza",
    texto: "Despedida de solteiro de um amigo. Qual roteiro você monta?",
    opcoes: [
      [0, "Jantar tranquilo e todo mundo em casa às 22h.", "Isso é despedida ou culto? ⛪"],
      [1, "Churrasco com os caras e uma resenha leve.", "Seguro. Sem graça, mas seguro."],
      [2, "Balada, open bar e alguém vomitando no Uber.", "Taxa de limpeza: R$ 150 🤮"],
      [3, "Puteiro, karaokê e o noivo acordando em outra cidade sem a aliança.", "Se Beber, Não Case: versão nacional 🎬"],
    ],
  },
  {
    emoji: "🏍️", cat: "presenca",
    texto: "Passa uma moto na rua e o Flávio começa: \"VRÁÁÁUM, VRUUUM\". Você:",
    opcoes: [
      [0, "Finjo que não conheço ele.", "Vergonha alheia ativada 🙈"],
      [1, "Dou um sorrisinho amarelo.", "Sorriso de RH 🙂"],
      [2, "Faço a troca de marcha junto.", "Dupla dinâmica 🏁"],
      [3, "Narro igual o Galvão e o escritório inteiro entra na corrida.", "Largada autorizada pelo gerente 🏍️"],
    ],
  },
  {
    emoji: "🎭", cat: "role",
    texto: "Carnaval. Onde você tá?",
    opcoes: [
      [0, "Em casa, vendo desfile na TV.", "Carnaval via satélite 📡"],
      [1, "Num retiro espiritual, fugindo da muvuca.", "Fugiu da folia, achou o tédio"],
      [2, "No bloquinho, de glitter, até a Quarta de Cinzas.", "Purpurina até no fígado ✨"],
      [3, "Beijei 14 pessoas, perdi o celular e acordei com a fantasia de outra pessoa.", "O carnaval passou por você e levou tudo 🎊"],
    ],
  },
  {
    emoji: "✨", cat: "zoeira",
    texto: "O Brayan sobe pro sistema uma feature que ninguém pediu (e só ele gosta). Você:",
    opcoes: [
      [0, "Testo, faço code review e sugiro melhorias.", "Mentor exemplar. Chato, mas exemplar."],
      [1, "Ignoro. Um dia alguém percebe.", "Deixa a vida me levar 🎶"],
      [2, "Pergunto quem pediu. Em voz alta. Na frente de todo mundo.", "Pergunta inocente, efeito devastador"],
      [3, "Anuncio no grupo: \"NOVA FEATURE: ninguém pediu, ninguém usa, mas o Brayan ama ❤️\".", "Lançamento mundial 🚀"],
    ],
  },
  {
    emoji: "📸", cat: "presenca",
    texto: "Você manda sem querer uma foto comprometedora no grupo da família. Você:",
    opcoes: [
      [0, "Impossível. Não tenho foto comprometedora.", "Vida limpa demais pra este teste"],
      [1, "Apago em 2 segundos e rezo pra ninguém ter visto.", "A tia viu. A tia sempre vê 👵"],
      [2, "Digo que fui hackeado.", "Desculpa de político 🧑‍⚖️"],
      [3, "Mando um \"e aí, gostaram?\" e saio do grupo.", "Banido do Natal 🎄"],
    ],
  },
  {
    emoji: "🌡️", cat: "safadeza",
    texto: "O Caetano solta mais uma cantada do nada, no meio do expediente. Você:",
    opcoes: [
      [0, "Finjo que não ouvi e volto pro trabalho.", "Imunidade de rebanho 💉"],
      [1, "Dou uma risada sem graça.", "Riso nervoso detectado"],
      [2, "Respondo na mesma altura e vira batalha de cantada.", "Duelo de mormaço 🔥"],
      [3, "Anoto todas num caderninho: \"Poesias do Caetano, Vol. 3\".", "Já tem editora interessada 📚"],
    ],
  },
  {
    emoji: "💔", cat: "fofoca",
    texto: "O ex de alguém do grupo aparece no rolê. Você:",
    opcoes: [
      [0, "Finjo que não sei de nada.", "Suíça emocional 🏳️"],
      [1, "Fico de olho pra ver se vai dar treta.", "Segurança voluntário 👀"],
      [2, "Pego a pipoca e narro baixinho pros amigos.", "Transmissão ao vivo 📺"],
      [3, "Apresento ele pro atual: \"vocês têm muito em comum\".", "Agente do caos 😈"],
    ],
  },
  {
    emoji: "🐂", cat: "zoeira",
    texto: "O Vitinho surta do nada porque o mouse travou. Você:",
    opcoes: [
      [0, "Fico quieto e saio de perto devagar.", "Instinto de sobrevivência 🦺"],
      [1, "Ofereço um copo d'água.", "Bombeiro da paz 🚒"],
      [2, "Coloco música de tourada de fundo.", "Olé! 🎺"],
      [3, "Balanço um pano vermelho na frente dele.", "Tourada liberada. Boa sorte 🚩"],
    ],
  },
  {
    emoji: "🍻", cat: "role",
    texto: "Sexta, fim de tarde. Alguém fala: \"só uma geladinha rápida\". Você:",
    opcoes: [
      [0, "Já tô em casa de pijama.", "Fugitivo profissional 🏃"],
      [1, "Vou, tomo um refri e saio às 19h em ponto.", "Presença simbólica registrada"],
      [2, "Vou e fico até a saideira.", "Saideira é compromisso 🍺"],
      [3, "\"Só uma\" terminou sábado de manhã num karaokê.", "Ninguém sabe como, todo mundo lembra 🎤"],
    ],
  },
  {
    emoji: "🦸", cat: "presenca",
    texto: "Sexta, 17h58, tudo pegando fogo, sistema fora do ar. O Maurício resolve em 5 minutos. Você:",
    opcoes: [
      [0, "Agradeço formalmente por e-mail.", "Protocolo corporativo 📧"],
      [1, "Mando um \"valeu, mestre\" no chat.", "O mínimo. Ok."],
      [2, "Puxo uma salva de palmas na sala.", "Ovação merecida 👏"],
      [3, "Proponho estátua de bronze do Maurício na entrada e feriado em homenagem.", "Salve o monstro supremo 🗿"],
    ],
  },
  {
    emoji: "💅", cat: "zoeira",
    texto: "Alguém manda no grupo um vídeo feito com IA do Petini dançando de cropped. Você:",
    opcoes: [
      [0, "Peço pra apagarem. Isso é bullying.", "Defensor dos oprimidos 🛡️"],
      [1, "Dou risada, mas não compartilho.", "Cúmplice silencioso 🤫"],
      [2, "Repasso pra mais 3 grupos.", "Distribuidor oficial 📦"],
      [3, "Faço a parte 2 com ele de salto alto e peruca, em 4K.", "Masculinidade frágil: DESTRUÍDA 💅"],
    ],
  },
  {
    emoji: "⏳", cat: "fofoca",
    texto: "O Arthur jura que \"amanhã termina\" aquele projeto. Você:",
    opcoes: [
      [0, "Acredito. Por que ele mentiria?", "Inocência comovente 🥹"],
      [1, "Anoto na agenda pra cobrar depois.", "Gerente de projeto não remunerado"],
      [2, "Aposto um café que não termina.", "Aposta segura ☕"],
      [3, "Colo na parede um contador: \"dias desde a promessa do Arthur: 84\".", "Ele entrega. Um dia. Talvez. ⏳"],
    ],
  },
  {
    emoji: "🪷", cat: "safadeza",
    texto: "A turma decide levar o Nicolas na Deva Chameli pra ele finalmente perder o cabaço. Você:",
    opcoes: [
      [0, "Cada um tem seu tempo. Deixa o menino em paz.", "Coração puro demais 🕊️"],
      [1, "Vou junto, mas fico na recepção tomando chá.", "Apoio moral na sala de espera 🍵"],
      [2, "Racho a conta pra garantir o pacote completo.", "Investidor-anjo do Nicolas 👼"],
      [3, "Organizo tudo, fecho o pacote premium e faço discurso de formatura na saída.", "Ele vai dizer \"já sei\". Não sabe. 🫣"],
    ],
  },
];

const MAX_PONTOS = PERGUNTAS.length * 3;

const NIVEIS = [
  {
    min: 0, emoji: "🪫", cor: "#9aa0a6",
    titulo: "Poste de Luz com Crachá",
    desc: "Você é o modo avião em forma de gente. Entra mudo, sai calado, e tem gente que jura que você é um holograma.",
    frase: "\"Já sei.\" (não sabia.)",
  },
  {
    min: 16, emoji: "🧊", cor: "#4d7cff",
    titulo: "Estraga Resenha Raiz",
    desc: "Quando você chega, a roda se desfaz sozinha. Recusa o rolê, acha tudo caro e ainda solta um \"bora focar, pessoal\" que ninguém pediu.",
    frase: "\"Ah, não vou não... tá caro, né cara.\"",
  },
  {
    min: 36, emoji: "🧳", cor: "#a06bff",
    titulo: "Turista da Resenha",
    desc: "Você visita a resenha, tira umas fotos, ri das piadas... mas não mora nela. Ainda acha que tem hora certa pra resenhar.",
    frase: "\"Ai, preciso voltar, tenho call.\"",
  },
  {
    min: 56, emoji: "📈", cor: "#ff7a1a",
    titulo: "Resenhudo em Ascensão",
    desc: "Já puxa papo, já tem apelido pra alguém e já mandou áudio de mais de 2 minutos. Quem vê de fora não dá nada, mas o potencial é real.",
    frase: "\"Me chamam de mormaço: não parece, mas queimo.\" 🔥",
  },
  {
    min: 73, emoji: "🏛️", cor: "#ff4fa3",
    titulo: "Patrimônio da Resenha",
    desc: "Tombado pelo IPHAN da zoeira. Sem você, o rolê é só um encontro de pessoas. Você não participa da resenha: você É a pauta.",
    frase: "\"VRÁÁÁUM, VRUUUM!\" 🏍️",
  },
  {
    min: 90, emoji: "👑", cor: "#c6ff3d",
    titulo: "Entidade Suprema da Resenha",
    desc: "Lenda viva, monstro supremo, nível Maurício. Até o Brayan conta histórias sobre você. A vida é só um intervalo entre uma resenha e outra.",
    frase: "\"Ora, são anjos! Anjos como no céu.\" 😎",
  },
];

const FRASES_LOADING = [
  "Consultando o VAR da resenha...",
  "Ouvindo seus áudios de 7 minutos...",
  "Conferindo com o Conselho Nacional da Resenha...",
  "Calibrando o Resenhômetro™...",
];

// ---------- Estado ----------
let nome = "";
let atual = 0;
let respostas = [];
let travado = false;

const $ = (id) => document.getElementById(id);
const embaralhar = (arr) => arr.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
const reduzMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

function mostrarTela(nomeTela) {
  document.querySelectorAll(".screen").forEach((s) => (s.hidden = s.dataset.screen !== nomeTela));
  window.scrollTo({ top: 0, behavior: reduzMovimento ? "auto" : "smooth" });
}

function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 2500);
}

// ---------- Quiz ----------
function iniciarQuiz() {
  atual = 0;
  respostas = [];
  mostrarTela("quiz");
  renderPergunta();
}

function renderPergunta() {
  const p = PERGUNTAS[atual];
  const card = $("questionCard");
  card.style.setProperty("--accent", ["#ffd23f", "#c6ff3d", "#7ee0ff", "#ffb3d9", "#ffb36b"][atual % 5]);
  card.classList.remove("enter");
  void card.offsetWidth; // reinicia a animação
  card.classList.add("enter");

  $("qEmoji").textContent = p.emoji;
  $("qCat").textContent = CATEGORIAS[p.cat];
  $("qText").textContent = p.texto;
  $("counter").textContent = `${String(atual + 1).padStart(2, "0")}/${PERGUNTAS.length}`;
  $("progressFill").style.width = `${(atual / PERGUNTAS.length) * 100}%`;
  $("progress").setAttribute("aria-valuenow", atual);
  $("backBtn").style.visibility = atual === 0 ? "hidden" : "visible";
  $("reaction").classList.remove("show");

  const box = $("options");
  box.innerHTML = "";
  embaralhar(p.opcoes).forEach(([pontos, texto, reacao], i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.dataset.key = "ABCD"[i];
    btn.textContent = texto;
    if (respostas[atual] === pontos) btn.classList.add("picked");
    btn.addEventListener("click", () => responder(btn, pontos, reacao));
    box.appendChild(btn);
  });
  travado = false;
}

function responder(btn, pontos, reacao) {
  if (travado) return;
  travado = true;
  respostas[atual] = pontos;
  document.querySelectorAll(".option").forEach((o) => o.classList.toggle("picked", o === btn));

  const r = $("reaction");
  r.textContent = reacao;
  r.classList.remove("show");
  void r.offsetWidth;
  r.classList.add("show");

  setTimeout(() => {
    atual++;
    if (atual < PERGUNTAS.length) renderPergunta();
    else finalizar();
  }, reduzMovimento ? 700 : 1100);
}

function voltar() {
  if (atual === 0 || travado) return;
  atual--;
  renderPergunta();
}

// ---------- Resultado ----------
function calcular() {
  const total = respostas.reduce((s, v) => s + v, 0);
  const porCat = {};
  PERGUNTAS.forEach((p, i) => {
    porCat[p.cat] ??= { soma: 0, max: 0 };
    porCat[p.cat].soma += respostas[i];
    porCat[p.cat].max += 3;
  });
  return { pontuacao: Math.round((total / MAX_PONTOS) * 100), porCat };
}

const nivelDe = (pontos) => NIVEIS.findLast((n) => pontos >= n.min);

async function finalizar() {
  const { pontuacao, porCat } = calcular();
  mostrarTela("loading");
  salvarResultado(nome, pontuacao); // em paralelo com a animação

  for (const frase of FRASES_LOADING) {
    $("loadingText").textContent = frase;
    await new Promise((r) => setTimeout(r, reduzMovimento ? 250 : 700));
  }
  mostrarResultado(pontuacao, porCat);
}

function mostrarResultado(pontuacao, porCat) {
  const nivel = nivelDe(pontuacao);
  mostrarTela("result");

  $("resultName").textContent = `${nome}, o laudo saiu:`;
  $("levelEmoji").textContent = nivel.emoji;
  $("levelTitle").textContent = nivel.titulo;
  $("levelDesc").textContent = nivel.desc;
  $("levelQuote").textContent = nivel.frase;
  $("levelCard").style.setProperty("--accent", nivel.cor);

  const stats = $("stats");
  stats.innerHTML = "";
  for (const [cat, { soma, max }] of Object.entries(porCat)) {
    const pct = Math.round((soma / max) * 100);
    const row = document.createElement("div");
    row.className = "stat";
    row.innerHTML = `<div class="stat-head"><span></span><b>${pct}%</b></div><div class="stat-bar"><i></i></div>`;
    row.querySelector("span").textContent = CATEGORIAS[cat];
    stats.appendChild(row);
    requestAnimationFrame(() => (row.querySelector("i").style.width = `${pct}%`));
  }

  animarGauge(pontuacao);
  if (pontuacao >= 73) chuvaDeEmoji(["🎉", "🍻", "👑", "🔥", "🥳"]);
  else if (pontuacao < 16) chuvaDeEmoji(["💤", "🪫", "😴", "🧊"]);

  $("shareBtn").onclick = () => compartilhar(pontuacao, nivel);
}

function montarGauge() {
  // um arco colorido por nível, do 0 ao 100
  const g = $("gaugeSegments");
  const ponto = (pct) => {
    const a = Math.PI * (1 - pct / 100);
    return `${100 + 80 * Math.cos(a)} ${100 - 80 * Math.sin(a)}`;
  };
  NIVEIS.forEach((n, i) => {
    const fim = NIVEIS[i + 1]?.min ?? 100;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M${ponto(n.min)} A80 80 0 0 1 ${ponto(fim)}`);
    path.setAttribute("stroke", n.cor);
    path.setAttribute("class", "gauge-seg");
    g.appendChild(path);
  });
}

function animarGauge(alvo) {
  const needle = $("needle");
  const num = $("scoreNumber");
  const dur = reduzMovimento ? 0 : 1800;
  const t0 = performance.now();
  (function frame(t) {
    const k = dur ? Math.min((t - t0) / dur, 1) : 1;
    const ease = 1 - Math.pow(1 - k, 3);
    // tremidinha no final pra parecer ponteiro de verdade
    const wobble = k < 1 ? Math.sin(k * 30) * (1 - k) * 6 : 0;
    const v = alvo * ease;
    num.textContent = Math.round(v);
    needle.style.transform = `rotate(${-90 + v * 1.8 + wobble}deg)`;
    if (k < 1) requestAnimationFrame(frame);
  })(t0);
}

function chuvaDeEmoji(emojis) {
  if (reduzMovimento) return;
  const box = $("confetti");
  box.innerHTML = "";
  for (let i = 0; i < 40; i++) {
    const s = document.createElement("span");
    s.textContent = emojis[i % emojis.length];
    s.style.left = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 1.5}s`;
    s.style.fontSize = `${18 + Math.random() * 22}px`;
    box.appendChild(s);
  }
  setTimeout(() => (box.innerHTML = ""), 5000);
}

async function compartilhar(pontuacao, nivel) {
  const texto =
    `${nivel.emoji} Medidor de Resenha 2026\n` +
    `Tirei ${pontuacao}/100 e fui classificado como "${nivel.titulo}".\n` +
    `Duvido você passar de mim 👉 ${location.origin}`;
  try {
    if (navigator.share) await navigator.share({ title: "Medidor de Resenha 2026", text: texto });
    else {
      await navigator.clipboard.writeText(texto);
      toast("Copiado! Agora cola no grupo 😈");
    }
  } catch {
    /* usuário cancelou o compartilhamento */
  }
}

// ---------- API / ranking ----------
async function salvarResultado(nome, pontuacao) {
  try {
    const res = await fetch("/api/pontuacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, pontuacao }),
    });
    if (!res.ok) throw new Error(res.status);
  } catch {
    try {
      const lista = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      lista.push({ nome, pontuacao, data_criacao: new Date().toISOString() });
      lista.sort((a, b) => b.pontuacao - a.pontuacao);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lista.slice(0, 10)));
    } catch {
      /* sem storage, segue o jogo */
    }
  }
}

async function carregarRanking() {
  try {
    const res = await fetch("/api/ranking");
    if (!res.ok) throw new Error(res.status);
    return { lista: (await res.json()).data, local: false };
  } catch {
    let lista = [];
    try {
      lista = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {}
    return { lista, local: true };
  }
}

async function mostrarRanking() {
  mostrarTela("ranking");
  const { lista, local } = await carregarRanking();

  const podium = $("podium");
  const ol = $("rankList");
  podium.innerHTML = "";
  ol.innerHTML = "";
  $("rankEmpty").hidden = lista.length > 0;
  $("rankSource").textContent = local ? "📴 Servidor offline — mostrando só os resultados deste aparelho." : "";

  const medalhas = ["🥇", "🥈", "🥉"];
  // ordem visual do pódio: 2º, 1º, 3º
  [1, 0, 2].forEach((i) => {
    const j = lista[i];
    if (!j) return;
    const el = document.createElement("div");
    el.className = `podium-spot p${i + 1}`;
    el.innerHTML = `<div class="podium-medal">${medalhas[i]}</div><div class="podium-name"></div><div class="podium-block">${j.pontuacao}</div>`;
    el.querySelector(".podium-name").textContent = j.nome;
    el.title = nivelDe(j.pontuacao).titulo;
    podium.appendChild(el);
  });

  lista.slice(3).forEach((j, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="pos">${i + 4}</span><span class="nm"></span><span class="lv"></span><b>${j.pontuacao}</b>`;
    li.querySelector(".nm").textContent = j.nome;
    li.querySelector(".lv").textContent = nivelDe(j.pontuacao).emoji;
    ol.appendChild(li);
  });
}

// ---------- Eventos ----------
let telaAntesDoRanking = "intro";

document.addEventListener("DOMContentLoaded", () => {
  montarGauge();

  $("startForm").addEventListener("submit", (e) => {
    e.preventDefault();
    nome = $("nome").value.trim().slice(0, 40);
    if (!nome) return toast("Sem nome não tem resenha 😤");
    iniciarQuiz();
  });

  $("backBtn").addEventListener("click", voltar);
  $("retryBtn").addEventListener("click", () => mostrarTela("intro"));
  $("rankBackBtn").addEventListener("click", () => mostrarTela(telaAntesDoRanking));

  document.querySelectorAll("[data-go='ranking']").forEach((b) =>
    b.addEventListener("click", () => {
      telaAntesDoRanking = b.closest(".screen").dataset.screen;
      mostrarRanking();
    })
  );

  // Atalhos: A-D ou 1-4 respondem, Backspace volta
  document.addEventListener("keydown", (e) => {
    if ($("questionCard").closest(".screen").hidden || e.target.tagName === "INPUT") return;
    const idx = "ABCD1234".indexOf(e.key.toUpperCase()) % 4;
    if (idx >= 0 && e.key.length === 1) document.querySelectorAll(".option")[idx]?.click();
    if (e.key === "Backspace") voltar();
  });

  // Easter egg: 5 toques no selo 2026 = MODO CAOS
  let toques = 0;
  $("yearSticker").addEventListener("click", () => {
    if (++toques < 5) return;
    toques = 0;
    document.body.classList.toggle("caos");
    toast(document.body.classList.contains("caos") ? "🌀 MODO CAOS ATIVADO" : "Ok, voltamos ao normal 😮‍💨");
    chuvaDeEmoji(["🌀", "🤪", "💥", "🎪"]);
  });
});
