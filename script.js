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
    img.src = "imagens/" + foto.arquivo;
    img.alt = foto.descricao;

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

// Monta uma pergunta na tela, com seus botões de resposta
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

// Trata o clique em uma resposta: marca certo/errado e mostra a explicação
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

// 1) Símbolos que flutuam no fundo: binário e código (presente), matemática (passado)
// 1) Símbolos que flutuam no fundo: binário e código (presente), matemática (passado).
//    Eles "dão a volta": quando saem por cima da tela, voltam por baixo,
//    então sempre há símbolos aparecendo, em qualquer ponto da página.
const simbolos = ["0", "1", "01", "10", "{ }", "</>", "λ", "∑", "π", "ℵ", "⌘", "█", "▒"];
const caixaBits = document.getElementById("bits");
const bits = [];

for (let i = 0; i < 26; i++) {
  const span = document.createElement("span");
  span.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
  span.style.left = Math.random() * 96 + "%";
  span.style.setProperty("--s", (14 + Math.random() * 32).toFixed(0) + "px"); // tamanho
  span.style.setProperty("--t", (8 + Math.random() * 8).toFixed(1) + "s");    // tempo da flutuação
  span.style.animationDelay = "-" + (Math.random() * 10).toFixed(1) + "s";
  caixaBits.appendChild(span);
  bits.push({
    el: span,
    y0: Math.random(),                  // posição de partida (0 = topo, 1 = base da tela)
    k: 0.05 + Math.random() * 0.45,     // velocidade com que sobe ao rolar (paralaxe)
    opac: 0.5 + Math.random() * 0.5     // brilho do símbolo
  });
}

function moverSimbolos() {
  const altura = caixaBits.parentElement.clientHeight || window.innerHeight;
  const rolagem = semMovimento ? 0 : window.scrollY;

  bits.forEach(function (b) {
    // posição = partida - rolagem * velocidade, com volta (módulo) para nunca sair da tela
    const y = (((b.y0 * altura - rolagem * b.k) % altura) + altura) % altura;
    // some devagar perto das bordas, para não "pular" quando dá a volta
    const borda = Math.min(1, y / 70, (altura - y) / 70);
    b.el.style.transform = "translateY(" + y.toFixed(1) + "px)";
    b.el.style.opacity = (b.opac * borda).toFixed(2);
  });
}

// 2) Progresso da rolagem: --p vai de 0 (topo) a 1 (fim) e controla
//    a barra do topo e a troca do fundo do passado para o presente
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

// 3) Animação ligada à rolagem: cada elemento recebe --r (0 = escondido, 1 = visível).
//    Descendo, ele aparece aos poucos; subindo, ele se desfaz. Nada fica "gravado".
const alvos = semMovimento ? [] : Array.from(document.querySelectorAll(
  ".era, .era .yr, .era > div:last-child > *:not(#qs), .q"
));

if (!semMovimento) {
  raiz.classList.add("sc"); // avisa o CSS que o script está funcionando
}

function atualizarEntradas() {
  const altura = window.innerHeight;
  const restante = raiz.scrollHeight - altura - window.scrollY; // quanto ainda dá para rolar
  const inicio = altura * 0.95; // começa a aparecer quando o topo do elemento passa daqui

  alvos.forEach(function (el) {
    const topo = el.getBoundingClientRect().top;
    // Até onde o elemento precisa subir para ficar 100% visível (70% da tela).
    // No fim da página ele não consegue subir tanto, então o limite se ajusta.
    const fim = Math.min(Math.max(altura * 0.7, topo - restante), inicio - 20);
    const r = Math.max(0, Math.min(1, (inicio - topo) / (inicio - fim)));
    el.style.setProperty("--r", r.toFixed(3));
  });
}

atualizarRolagem();

// ---------- Fotos ----------
// Se o arquivo da foto não existir na pasta "imagens", a caixa avisa qual nome está faltando
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
