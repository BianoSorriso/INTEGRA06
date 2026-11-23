// ---------- Alternância entre tema claro e escuro ----------
const botaoTema = document.getElementById("themeToggle");
const temaSalvo = localStorage.getItem("memorias-tema");

if (temaSalvo === "dark" || temaSalvo === "light") {
  document.documentElement.dataset.theme = temaSalvo;
} else {
  document.documentElement.dataset.theme = "light";
}

function atualizarBotaoTema() {
  const escuro = document.documentElement.dataset.theme === "dark";
  botaoTema.textContent = escuro ? "☀ Tema claro" : "☾ Tema escuro";
  botaoTema.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
  botaoTema.setAttribute("aria-pressed", String(escuro));
}

botaoTema.addEventListener("click", function () {
  const proximoTema = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = proximoTema;
  localStorage.setItem("memorias-tema", proximoTema);
  atualizarBotaoTema();
});

atualizarBotaoTema();


 // Quiz da exposição "Memórias da Computação"
 // Para editar uma pergunta, mude os textos abaixo.
 // "correta" é a posição da resposta certa na lista de opções (começa em 0).

 // ---------- Fotos: montadas a partir do arquivo fotos.js ----------
document.querySelectorAll(".ph[data-secao]").forEach(function (caixa) {
  const lista = (typeof fotos !== "undefined" && fotos[caixa.dataset.secao]) || [];

  lista.forEach(function (foto) {
    const figura = document.createElement("figure");
    figura.className = "foto";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = foto.descricao;
    img.src = "imagens/" + foto.arquivo;

    if (foto.posicao) {
      img.style.objectPosition = foto.posicao;
    }

    const legenda = document.createElement("figcaption");
    legenda.textContent = foto.legenda;
    legenda.dataset.arquivo = "imagens/" + foto.arquivo;

    figura.appendChild(img);
    figura.appendChild(legenda);
    caixa.appendChild(figura);
  });
});

const perguntas = [
  {
    pergunta: "Quem escreveu, em 1843, notas com um algoritmo para a Máquina Analítica de Babbage?",
    opcoes: ["Grace Hopper", "Ada Lovelace", "Alan Turing", "Katherine Johnson"],
    correta: 1,
    explicacao: "Ada Lovelace escreveu o algoritmo, considerado por muitos o primeiro programa da história."
  },
  {
    pergunta: "Qual componente era a base do funcionamento do ENIAC?",
    opcoes: ["Transistores", "Microprocessadores", "Válvulas eletrônicas", "Fibras ópticas"],
    correta: 2,
    explicacao: "O ENIAC usava cerca de 18 mil válvulas eletrônicas."
  },
  {
    pergunta: "O que permitiu computadores menores, mais baratos e presentes nas casas?",
    opcoes: [
      "Válvulas cada vez maiores",
      "Disquetes",
      "Telas sensíveis ao toque",
      "Transistores, circuitos integrados e microprocessadores"
    ],
    correta: 3,
    explicacao: "A miniaturização dos componentes reduziu o tamanho e o custo das máquinas."
  },
  {
    pergunta: "Qual invenção fez a informação circular em escala global por páginas interligadas?",
    opcoes: ["World Wide Web", "Cartão perfurado", "Máquina Analítica", "Mecanismo de Anticítera"],
    correta: 0,
    explicacao: "A World Wide Web, criada no CERN e aberta ao público nos anos 1990."
  },
  {
    pergunta: "O que aconteceu com o uso da tecnologia durante a pandemia de COVID-19?",
    opcoes: [
      "Diminuiu, porque todos ficaram em casa",
      "Aumentou para estudar, trabalhar e socializar",
      "Ficou igual ao período anterior",
      "Foi usada só para entretenimento"
    ],
    correta: 1,
    explicacao: "Aulas, trabalho e encontros passaram a depender de tecnologias digitais."
  },
  {
    pergunta: "Que atitude a exposição defende em relação à tecnologia?",
    opcoes: [
      "Abandoná-la completamente",
      "Ignorar seus impactos",
      "Trocar todo o contato presencial pelo virtual",
      "Usá-la com consciência, equilibrando o virtual e o presencial"
    ],
    correta: 3,
    explicacao: "A proposta é aproveitar os avanços sem perder a qualidade das relações humanas."
  }
];

const caixaQuiz = document.getElementById("qs");
const placar = document.getElementById("score");

let respondidas = 0;
let acertos = 0;

function montarPergunta(item, indice) {
  const cartao = document.createElement("div");
  cartao.className = "q";

  const titulo = document.createElement("h3");
  titulo.textContent = (indice + 1) + ". " + item.pergunta;
  cartao.appendChild(titulo);

  const explicacao = document.createElement("p");
  explicacao.className = "ex";
  explicacao.hidden = true;

  item.opcoes.forEach(function (texto, posicao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "opt";
    botao.textContent = texto;

    botao.onclick = function () {
      responder(cartao, botao, posicao, item, explicacao);
    };

    cartao.appendChild(botao);
  });

  cartao.appendChild(explicacao);
  caixaQuiz.appendChild(cartao);
}

function responder(cartao, botaoClicado, posicao, item, explicacao) {
  const botoes = cartao.querySelectorAll(".opt");

  botoes.forEach(function (botao, i) {
    botao.disabled = true;

    if (i === item.correta) {
      botao.classList.add("ok");
    }
  });

  if (posicao === item.correta) {
    acertos++;
  } else {
    botaoClicado.classList.add("no");
  }

  explicacao.textContent = item.explicacao;
  explicacao.hidden = false;

  respondidas++;

  if (respondidas === perguntas.length) {
    placar.textContent = "Você acertou " + acertos + " de " + perguntas.length + ".";
  }
}

perguntas.forEach(montarPergunta);

// ---------- Efeitos de rolagem e fundo ----------
const raiz = document.documentElement;
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const simbolos = ["0", "1", "01", "10", "{ }", "</>", "λ", "∑", "π", "ℵ", "⌘", "█", "▒"];
const caixaBits = document.getElementById("bits");
const bits = [];

for (let i = 0; i < 26; i++) {
  const span = document.createElement("span");
  span.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
  span.style.left = Math.random() * 96 + "%";
  span.style.setProperty("--s", (14 + Math.random() * 32).toFixed(0) + "px");
  span.style.setProperty("--t", (8 + Math.random() * 8).toFixed(1) + "s");
  span.style.animationDelay = "-" + (Math.random() * 10).toFixed(1) + "s";

  caixaBits.appendChild(span);

  bits.push({
    el: span,
    y0: Math.random(),
    k: 0.05 + Math.random() * 0.45,
    opac: 0.5 + Math.random() * 0.5
  });
}

function moverSimbolos() {
  const altura = caixaBits.parentElement.clientHeight || window.innerHeight;
  const rolagem = semMovimento ? 0 : window.scrollY;

  bits.forEach(function (b) {
    const y = (((b.y0 * altura - rolagem * b.k) % altura) + altura) % altura;
    const borda = Math.min(1, y / 70, (altura - y) / 70);

    b.el.style.transform = "translateY(" + y.toFixed(1) + "px)";
    b.el.style.opacity = (b.opac * borda).toFixed(2);
  });
}

let aguardandoFrame = false;

function atualizarRolagem() {
  const maximo = raiz.scrollHeight - window.innerHeight;
  const p = maximo > 0 ? Math.min(1, window.scrollY / maximo) : 0;

  raiz.style.setProperty("--p", p.toFixed(3));
  moverSimbolos();
  atualizarEntradas();

  aguardandoFrame = false;
}

window.addEventListener("scroll", function () {
  if (!aguardandoFrame) {
    aguardandoFrame = true;
    requestAnimationFrame(atualizarRolagem);
  }
}, { passive: true });

window.addEventListener("resize", atualizarRolagem);

const alvos = semMovimento ? [] : Array.from(document.querySelectorAll(
  ".era, .era .yr, .era > div:last-child > *:not(#qs), .q"
));

if (!semMovimento) {
  raiz.classList.add("sc");
}

function atualizarEntradas() {
  const altura = window.innerHeight;
  const restante = raiz.scrollHeight - altura - window.scrollY;
  const inicio = altura * 0.95;

  alvos.forEach(function (el) {
    const topo = el.getBoundingClientRect().top;
    const fim = Math.min(Math.max(altura * 0.7, topo - restante), inicio - 20);
    const r = Math.max(0, Math.min(1, (inicio - topo) / (inicio - fim)));

    el.style.setProperty("--r", r.toFixed(3));
  });
}

atualizarRolagem();

// ---------- Identificação de fotos ausentes ----------
function marcarFaltando(img) {
  const figura = img.closest("figure");

  if (figura) {
    figura.classList.add("faltando");
  }
}

document.querySelectorAll(".foto img").forEach(function (img) {
  if (img.complete && img.naturalWidth === 0) {
    marcarFaltando(img);
  }

  img.addEventListener("error", function () {
    marcarFaltando(img);
  });
});


/* ---------- Ampliação das imagens em tela cheia ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImagem = document.getElementById("lightboxImage");
const lightboxLegenda = document.getElementById("lightboxCaption");
const fecharLightbox = document.getElementById("lightboxClose");
let imagemAnterior = null;

function abrirLightbox(img) {
  imagemAnterior = img;
  lightboxImagem.src = img.currentSrc || img.src;
  lightboxImagem.alt = img.alt || "Imagem ampliada";
  const legenda = img.closest("figure")?.querySelector("figcaption");
  lightboxLegenda.textContent = legenda ? legenda.textContent : "";
  lightbox.classList.add("aberto");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-aberto");
  fecharLightbox.focus();
}

function encerrarLightbox() {
  lightbox.classList.remove("aberto");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-aberto");
  lightboxImagem.removeAttribute("src");
  if (imagemAnterior) imagemAnterior.focus?.();
}

document.querySelectorAll(".ph figure img").forEach(function (img) {
  img.tabIndex = 0;
  img.addEventListener("click", function () { abrirLightbox(img); });
  img.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      abrirLightbox(img);
    }
  });
});

fecharLightbox.addEventListener("click", encerrarLightbox);
lightbox.addEventListener("click", function (evento) {
  if (evento.target === lightbox || evento.target === lightboxImagem) encerrarLightbox();
});
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && lightbox.classList.contains("aberto")) encerrarLightbox();
});
