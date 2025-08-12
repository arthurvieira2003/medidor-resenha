// Configurações e dados do aplicativo
const STORAGE_KEY = "medidor-resenha-rankings";

// Classificações baseadas na pontuação
const classificacoes = {
  1: {
    titulo: "Estraga Resenha",
    descricao: `Você é uma pessoa que só pensa em trabalhar, chato pra carai, estraga resenha, procure melhorar. "Vivo para trabalhar" 🙄`,
    icon: "fas fa-user-tie",
    classe: "level-1",
  },
  2: {
    titulo: "Analisando Possível Resenha",
    descricao: `Você tem um pouquinho de resenha mas ainda pensa demais em trabalhar, acha que tem hora para conversar e só resenha quando sobre tempo, mas somente observa a resenha alheia sem interferir. "Não, eu não bebo nem fumo." 😒`,
    icon: "fas fa-handshake",
    classe: "level-2",
  },
  3: {
    titulo: "Resenhudo Intermediário",
    descricao: `Você gosta de uma boa conversa e não perde uma oportunidade de resenhar, mas ainda considera a resenha como uma distração, e não um estilo de vida. "Ai meu Deus, preciso voltar ao trabalho." 😐`,
    icon: "fas fa-comments",
    classe: "level-3",
  },
  4: {
    titulo: "Resenhudo Avançado",
    descricao: `Você é uma pessoa que adora e puxa conversa, abre mão de tudo para uma boa resenha, sabe muito do fute e tem sempre um trocadalho do carilho na ponta da língua. "Bora tomar uma." 🙂`,
    icon: "fas fa-star",
    classe: "level-4",
  },
  5: {
    titulo: "Mestre da Resenha",
    descricao: `Parabéns! Você é oficialmente um puta resenhudo! É impossível resistir a uma boa resenha porque você sabe que no fim do dia é isso que importa, você bebe até ficar torto mas a resenha não te tira do chão, é um verdadeiro mestre da resenha. "Ora, são anjos! Anjos como no céu." 😎`,
    icon: "fas fa-crown",
    classe: "level-5",
  },
};

// Elementos DOM
const formContainer = document.getElementById("formContainer");
const resultContainer = document.getElementById("resultContainer");
const rankingContainer = document.getElementById("rankingContainer");
const resenhaForm = document.getElementById("resenhaForm");

// Variáveis de paginação
let currentPage = 1;
const totalPages = 7;

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  carregarRanking();

  // Inicializar paginação
  initializePagination();

  resenhaForm.addEventListener("submit", function (e) {
    e.preventDefault();
    calcularResenha();
  });

  // Adicionar animações aos elementos quando aparecem na tela
  observarElementos();
});

// Funções de paginação
function initializePagination() {
  updatePageDisplay();
  updateProgressBar();
}

function nextPage() {
  console.log("=== BOTÃO PRÓXIMA CLICADO ===");
  console.log("Página atual antes da validação:", currentPage);

  if (currentPage < totalPages) {
    // Verificar se as perguntas da página atual foram respondidas
    if (!validateCurrentPage()) {
      console.log("Validação falhou! Permanecendo na página atual.");
      alert(
        "Por favor, responda todas as perguntas desta página antes de continuar!"
      );
      return;
    }

    console.log("Validação passou! Avançando para próxima página.");
    document.getElementById(`page${currentPage}`).style.display = "none";
    currentPage++;
    console.log("Nova página atual:", currentPage);
    document.getElementById(`page${currentPage}`).style.display = "block";
    updatePageDisplay();
    updateProgressBar();

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    console.log("Já está na última página!");
  }
}

function previousPage() {
  if (currentPage > 1) {
    document.getElementById(`page${currentPage}`).style.display = "none";
    currentPage--;
    document.getElementById(`page${currentPage}`).style.display = "block";
    updatePageDisplay();
    updateProgressBar();

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function updatePageDisplay() {
  document.getElementById("currentPage").textContent = currentPage;
  document.getElementById("totalPages").textContent = totalPages;

  // Atualizar botões
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  prevBtn.disabled = currentPage === 1;

  if (currentPage === totalPages) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  } else {
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }
}

function updateProgressBar() {
  const progressFill = document.getElementById("progressFill");
  const progress = (currentPage / totalPages) * 100;
  progressFill.style.width = `${progress}%`;
}

// Definir perguntas por página
const questionsByPage = {
  1: ["inicia_conversa", "pausas_cafe", "piadas_historias"],
  2: ["redes_sociais", "fofocas", "compartilha_conteudo"],
  3: [
    "comemoracoes",
    "comportamento_almoco",
    "atividades_descontracao",
    "musica_ambiente",
    "sair_mesa",
  ],
  4: [
    "bem_estar_colegas",
    "datas_especiais",
    "comportamento_reunioes",
    "trocadilhos_bullying",
  ],
  5: [
    "time_coracao",
    "torce_brasil",
    "ve_gols",
    "radio_esportivo",
    "futebol_trabalho",
    "transferencias",
    "conhece_jogadores",
  ],
  6: [
    "foi_zona",
    "repertorio_cortes",
    "deixa_respirar",
    "limite_cerveja",
    "bebidas_hardcore",
  ],
  7: [
    "desilusoes_amorosas",
    "fala_desilusoes",
    "musica_sofrencia",
    "bebe_tristeza",
    "piada_desilusao",
    "upgrade_final",
  ],
};

// Função para validar se todas as perguntas da página atual foram respondidas
function validateCurrentPage() {
  console.log("=== VALIDAÇÃO DA PÁGINA ===");
  console.log("Página atual:", currentPage);

  const questionsInPage = questionsByPage[currentPage];
  console.log("Perguntas da página atual:", questionsInPage);

  for (let questionName of questionsInPage) {
    console.log("Verificando pergunta:", questionName);
    const checkedInput = document.querySelector(
      `input[name="${questionName}"]:checked`
    );
    console.log("Input respondido encontrado:", checkedInput);

    if (!checkedInput) {
      console.log("ERRO: Pergunta não respondida:", questionName);
      return false;
    } else {
      console.log(
        "Pergunta respondida:",
        questionName,
        "=",
        checkedInput.value
      );
    }
  }

  console.log("Todas as perguntas da página foram respondidas!");
  return true;
}

// Função principal para calcular o nível de resenha
function calcularResenha() {
  const formData = new FormData(resenhaForm);
  const nome = formData.get("nome").trim();

  if (!nome) {
    alert("Por favor, digite seu nome!");
    return;
  }

  // Verificar se todas as perguntas foram respondidas
  const perguntas = [
    "inicia_conversa",
    "pausas_cafe",
    "piadas_historias",
    "redes_sociais",
    "fofocas",
    "compartilha_conteudo",
    "comemoracoes",
    "comportamento_almoco",
    "atividades_descontracao",
    "musica_ambiente",
    "sair_mesa",
    "bem_estar_colegas",
    "datas_especiais",
    "comportamento_reunioes",
    "trocadilhos_bullying",
    "time_coracao",
    "torce_brasil",
    "ve_gols",
    "radio_esportivo",
    "futebol_trabalho",
    "transferencias",
    "conhece_jogadores",
    "foi_zona",
    "repertorio_cortes",
    "deixa_respirar",
    "limite_cerveja",
    "bebidas_hardcore",
    "desilusoes_amorosas",
    "fala_desilusoes",
    "musica_sofrencia",
    "bebe_tristeza",
    "piada_desilusao",
    "upgrade_final",
  ];
  let pontuacaoTotal = 0;
  let perguntasRespondidas = 0;

  perguntas.forEach((pergunta) => {
    const valor = formData.get(pergunta);
    if (valor) {
      pontuacaoTotal += parseInt(valor);
      perguntasRespondidas++;
    }
  });

  if (perguntasRespondidas < perguntas.length) {
    alert("Por favor, responda todas as perguntas!");
    return;
  }

  // Determinar classificação (agora com 34 perguntas, pontuação máxima = 137)
  const pontuacaoMaxima = 137;
  const pontuacaoPercentual = (pontuacaoTotal / pontuacaoMaxima) * 100;

  let nivelClassificacao;
  if (pontuacaoPercentual <= 33.6) {
    // até 46 pontos
    nivelClassificacao = 1;
  } else if (pontuacaoPercentual <= 50.4) {
    // até 69 pontos
    nivelClassificacao = 2;
  } else if (pontuacaoPercentual <= 67.2) {
    // até 92 pontos
    nivelClassificacao = 3;
  } else if (pontuacaoPercentual <= 83.9) {
    // até 115 pontos
    nivelClassificacao = 4;
  } else {
    nivelClassificacao = 5;
  }

  // Salvar resultado
  salvarResultado(nome, pontuacaoTotal, nivelClassificacao);

  // Mostrar resultado com animação
  mostrarResultado(nome, pontuacaoTotal, nivelClassificacao);
}

// Função para mostrar o resultado
function mostrarResultado(nome, pontuacao, nivel) {
  const classificacao = classificacoes[nivel];

  // Esconder formulário e mostrar resultado
  formContainer.style.display = "none";
  resultContainer.style.display = "block";

  // Animar pontuação
  animarPontuacao(pontuacao);

  // Preencher dados da classificação
  document.getElementById(
    "classificationTitle"
  ).textContent = `Parabéns, ${nome}!`;
  document.getElementById("classificationIcon").className = classificacao.icon;
  document.getElementById("classificationText").textContent =
    classificacao.titulo;
  document.getElementById("classificationDescription").textContent =
    classificacao.descricao;

  const badge = document.getElementById("classificationBadge");
  badge.className = `classification-badge ${classificacao.classe}`;

  // Scroll suave para o resultado
  resultContainer.scrollIntoView({ behavior: "smooth" });

  // Atualizar ranking
  carregarRanking();
}

// Função para animar a pontuação
function animarPontuacao(pontuacaoFinal) {
  const scoreNumber = document.getElementById("scoreNumber");
  const scoreFill = document.getElementById("scoreFill");

  const pontuacaoMaxima = 137; // 34 perguntas (33 x 4 pontos + 1 x 5 pontos)
  const pontuacaoMaximaExibicao = 100; // Escala de 0 a 100 para exibição

  // Converter pontuação para escala de 0 a 100
  const pontuacaoConvertida = Math.round(
    (pontuacaoFinal / pontuacaoMaxima) * pontuacaoMaximaExibicao
  );

  let pontuacaoAtual = 0;
  const incremento = pontuacaoConvertida / 50; // 50 frames de animação

  const intervalo = setInterval(() => {
    pontuacaoAtual += incremento;

    if (pontuacaoAtual >= pontuacaoConvertida) {
      pontuacaoAtual = pontuacaoConvertida;
      clearInterval(intervalo);
    }

    scoreNumber.textContent = Math.round(pontuacaoAtual);
  }, 40);

  // Animar barra de progresso
  setTimeout(() => {
    scoreFill.style.width = `${pontuacaoConvertida}%`;
  }, 500);
}

// Função para salvar resultado no localStorage
function salvarResultado(nome, pontuacao, nivel) {
  let rankings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // Verificar se o usuário já existe
  const indiceExistente = rankings.findIndex(
    (item) => item.nome.toLowerCase() === nome.toLowerCase()
  );

  const novoResultado = {
    nome: nome,
    pontuacao: pontuacao,
    nivel: nivel,
    classificacao: classificacoes[nivel].titulo,
    data: new Date().toISOString(),
  };

  if (indiceExistente !== -1) {
    // Atualizar resultado existente
    rankings[indiceExistente] = novoResultado;
  } else {
    // Adicionar novo resultado
    rankings.push(novoResultado);
  }

  // Ordenar por pontuação (maior para menor)
  rankings.sort((a, b) => b.pontuacao - a.pontuacao);

  // Manter apenas os top 10
  rankings = rankings.slice(0, 10);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(rankings));
}

// Função para carregar e exibir o ranking
function carregarRanking() {
  const rankings = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const rankingList = document.getElementById("rankingList");

  if (rankings.length === 0) {
    rankingList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-trophy" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3;"></i>
                <p style="font-size: 1.2rem;">Nenhum resultado ainda!</p>
                <p>Seja o primeiro a fazer o teste!</p>
            </div>
        `;
    return;
  }

  rankingList.innerHTML = "";

  rankings.forEach((item, index) => {
    const posicao = index + 1;
    let classeposicao = "";
    let iconeposicao = "";

    if (posicao === 1) {
      classeposicao = "first";
      iconeposicao = '<i class="fas fa-crown"></i>';
    } else if (posicao === 2) {
      classeposicao = "second";
      iconeposicao = '<i class="fas fa-medal"></i>';
    } else if (posicao === 3) {
      classeposicao = "third";
      iconeposicao = '<i class="fas fa-award"></i>';
    }

    const rankingItem = document.createElement("div");
    rankingItem.className = "ranking-item";
    rankingItem.style.animationDelay = `${index * 0.1}s`;

    rankingItem.innerHTML = `
            <div class="ranking-position ${classeposicao}">
                ${iconeposicao}
                ${posicao}º
            </div>
            <div class="ranking-info">
                <div class="ranking-name">${item.nome}</div>
                <div class="ranking-classification">${item.classificacao}</div>
            </div>
            <div class="ranking-score">${Math.round(
              (item.pontuacao / 137) * 100
            )}/100</div>
        `;

    rankingList.appendChild(rankingItem);
  });
}

// Função para resetar o formulário
function resetForm() {
  resenhaForm.reset();
  formContainer.style.display = "block";
  resultContainer.style.display = "none";

  // Scroll suave para o formulário
  formContainer.scrollIntoView({ behavior: "smooth" });
}

// Função para compartilhar resultado
function shareResult() {
  const nome = document
    .getElementById("classificationTitle")
    .textContent.replace("Parabéns, ", "")
    .replace("!", "");
  const classificacao =
    document.getElementById("classificationText").textContent;
  const pontuacao = document.getElementById("scoreNumber").textContent;

  const texto =
    `🎯 Acabei de descobrir meu nível de resenha!\n\n` +
    `👤 ${nome}\n` +
    `🏆 ${classificacao}\n` +
    `📊 Pontuação: ${Math.round((pontuacao / 137) * 100)}/100\n\n` +
    `Faça você também o teste e descubra se é mais resenhudo que eu! 😄`;

  if (navigator.share) {
    navigator.share({
      title: "Meu Resultado no Medidor de Resenha",
      text: texto,
    });
  } else {
    // Fallback para copiar para clipboard
    navigator.clipboard
      .writeText(texto)
      .then(() => {
        alert("Resultado copiado para a área de transferência!");
      })
      .catch(() => {
        // Fallback manual
        const textArea = document.createElement("textarea");
        textArea.value = texto;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Resultado copiado para a área de transferência!");
      });
  }
}

// Função para observar elementos e adicionar animações
function observarElementos() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observar elementos que devem ser animados
  document.querySelectorAll(".question-group").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
}

// Adicionar efeitos sonoros (opcional)
function playSound(type) {
  // Criar contexto de áudio
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  let frequency;
  switch (type) {
    case "success":
      frequency = 800;
      break;
    case "click":
      frequency = 400;
      break;
    default:
      frequency = 600;
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.3
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

// Adicionar efeitos de hover nos botões
document.addEventListener("DOMContentLoaded", function () {
  // Efeito de partículas no botão de submit
  const submitBtn = document.querySelector(".submit-btn");

  submitBtn.addEventListener("click", function (e) {
    createParticles(e.target);
  });
});

// Função para criar efeito de partículas
function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const particles = 15;

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = rect.left + rect.width / 2 + "px";
    particle.style.top = rect.top + rect.height / 2 + "px";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.backgroundColor = "#667eea";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";

    document.body.appendChild(particle);

    const angle = (i / particles) * Math.PI * 2;
    const velocity = 100;
    const lifetime = 1000;

    particle.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(${Math.cos(angle) * velocity}px, ${
            Math.sin(angle) * velocity
          }px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: lifetime,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      particle.remove();
    };
  }
}

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.code);

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    ativarEasterEgg();
    konamiCode = [];
  }
});

function ativarEasterEgg() {
  document.body.style.animation = "rainbow 2s infinite";

  const style = document.createElement("style");
  style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
  document.head.appendChild(style);

  setTimeout(() => {
    document.body.style.animation = "";
    style.remove();
  }, 10000);

  alert(
    "🎉 Easter Egg ativado! Você descobriu o segredo do medidor de resenha! 🌈"
  );
}
