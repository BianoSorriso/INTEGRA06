// FOTOS DA EXPOSIÇÃO: este é o único arquivo que você precisa editar para as imagens.
//
// Como funciona:
//   1. Salve a foto na pasta "imagens" (nome sem espaços nem acentos, por exemplo ada-lovelace.jpg).
//   2. Na seção certa abaixo, preencha o bloco da foto:
//        arquivo   -> nome do arquivo dentro da pasta "imagens"
//        descricao -> texto curto descrevendo a imagem (para leitores de tela)
//        legenda   -> texto que aparece embaixo da foto, com o crédito
//   3. Para ADICIONAR uma foto, copie um bloco { ... } e mude os textos (com vírgula entre os blocos).
//      Para TIRAR uma foto, apague o bloco inteiro.
//
// Enquanto o arquivo não estiver na pasta, o site mostra uma caixa "Foto pendente" com o nome esperado.
// As fotos aparecem lado a lado automaticamente, até 3 por linha.

const fotos = {

  "1843": [
    {
      arquivo: "ada-lovelace.jpg",
      descricao: "Retrato em aquarela de Ada Lovelace",
      legenda: "Retrato em aquarela de Ada Lovelace, 1840. Alfred Edward Chalon, via Science Museum Group. Domínio público. Wikimedia Commons."
    },
    {
      arquivo: "anticitera.jpg",
      descricao: "Fragmento do mecanismo de Anticítera",
      legenda: "Fragmento do mecanismo de Anticítera, Museu Arqueológico Nacional de Atenas. Domínio público. Wikimedia Commons.."
    },
    {
      arquivo: "babbage-difference-engine.jpg",
      descricao: "Difference Engine de Charles Babbage",
      legenda: "Difference Engine, de Charles Babbage, Science Museum, Londres. Domínio público. Wikimedia Commons.."
    }
  ],

  "1946": [
    {
      arquivo: "eniac.jpg",
      descricao: "Computador eletrônico da década de 1940",
      legenda: "Computador eletrônico da década de 1940. Domínio público. Wikimedia Commons."
    },
    {
      arquivo: "bombe.jpg",
      descricao: "Réplica da máquina Bombe",
      legenda: "Réplica da Bombe, máquina usada para decifrar mensagens. Créditos"
    }
  ],

  "1971": [
    {
      arquivo: "acervo-faculdade.jpg",
      descricao: "Item do acervo da faculdade",
      legenda: "[Nome do item e ano]. Acervo da faculdade. Foto: [seu nome]."
    },
    {
      arquivo: "intel-4004.jpg",
      descricao: "Microprocessador Intel 4004",
      legenda: "Microprocessador Intel 4004, 1971. Crédito: Domínio público. Wikimedia Commons.."
    }
  ],

  "1991": [
    {
      arquivo: "interface-grafica.jpg",
      descricao: "Interface gráfica de um sistema antigo",
      legenda: "Interface gráfica de um sistema da época. Crédito: Domínio público. Wikimedia Commons.."
    },
    {
      arquivo: "servidor-cern.jpg",
      descricao: "Servidor web do CERN",
      legenda: "Computador usado nos primeiros anos da Web, no CERN. Crédito: Domínio público. Wikimedia Commons."
    },
    {
      arquivo: "pixel-art.jpg",
      descricao: "Pixel art",
      legenda: "Pixel art. Criação própria."
    }
  ],

  "2020": [
    {
      arquivo: "pessoas-telas.jpg",
      descricao: "Pessoas usando telas",
      legenda: "Crédito: Domínio público. Wikimedia Commons."
    }
  ],

  "hoje": [
    {
      arquivo: "ia-humanos.jpg",
      descricao: "Ilustração de humanos e inteligência artificial",
      legenda: "Ilustração própria."
    }
  ]

};
