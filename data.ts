import { Device } from './types';

export const DEVICES: Device[] = [
  {
    id: 'alexa',
    name: 'Alexa',
    icon: 'Mic',
    shortDescription: 'Assistente de voz inteligente.',
    fullDescription: 'A Alexa é uma caixinha inteligente que fala com a gente. Ela responde perguntas e toca música.',
    usage: 'Serve para ajudar a encontrar informações rápidas só usando a voz.',
    witContext: 'No Núcleo WIT, perguntamos para a Alexa como está o clima antes da aula.',
    challenge: 'Pergunte: "Alexa, que som o gato faz?"',
    imageAlt: 'Um dispositivo cilíndrico pequeno com luz azul em cima.',
    tts: {
      intro: 'Ahoy! Vamos navegar e conhecer a Alexa?',
      content: 'A Alexa é uma assistente inteligente. Ela serve para responder perguntas e nos ajudar. No Núcleo WIT, usamos para saber o clima. Tente perguntar algo para ela!'
    }
  },
  {
    id: 'vr-goggles',
    name: 'Óculos VR',
    icon: 'Glasses',
    shortDescription: 'Viaje sem sair do lugar.',
    fullDescription: 'Os Óculos de Realidade Virtual mostram mundos digitais. Parece que estamos dentro do jogo!',
    usage: 'Serve para visitar lugares distantes ou imaginários.',
    witContext: 'Viajamos para o espaço sideral usando os óculos na aula de ciências.',
    challenge: 'Imagine que você está na lua. O que você vê?',
    imageAlt: 'Óculos grandes que cobrem os olhos para realidade virtual.',
    tts: {
      intro: 'Terra à vista! Com este óculos, podemos ir longe.',
      content: 'Estes são os Óculos de Realidade Virtual. Eles servem para nos levar a mundos digitais. No WIT, usamos para ir ao espaço! Imagine que você está flutuando.'
    }
  },
  {
    id: 'mouse',
    name: 'Mouse',
    icon: 'Mouse',
    shortDescription: 'Move a setinha na tela.',
    fullDescription: 'O mouse é como a mão do computador. Ele clica e arrasta coisas.',
    usage: 'Serve para controlar o cursor e abrir programas.',
    witContext: 'Usamos o mouse para desenhar no computador.',
    challenge: 'Faça um movimento de círculo com sua mão na mesa.',
    imageAlt: 'Um pequeno objeto oval com fio e botões.',
    tts: {
      intro: 'Olha o ratinho no convés! É o mouse.',
      content: 'O mouse controla a setinha na tela. Ele serve para clicar e abrir coisas. No WIT, usamos para desenhar. Tente mexer a mão como se usasse um mouse.'
    }
  },
  {
    id: 'keyboard',
    name: 'Teclado',
    icon: 'Keyboard',
    shortDescription: 'Para escrever no computador.',
    fullDescription: 'O teclado tem muitas letras e números. É como uma máquina de escrever moderna.',
    usage: 'Serve para digitar textos e comandos.',
    witContext: 'Escrevemos nossos nomes nos projetos usando o teclado.',
    challenge: 'Encontre a primeira letra do seu nome em um teclado imaginário.',
    imageAlt: 'Um retângulo com várias teclas de letras e números.',
    tts: {
      intro: 'Muitas teclas neste mapa! Vamos escrever?',
      content: 'Este é o teclado. Ele serve para digitar textos. No WIT, usamos para escrever nomes. Qual é a primeira letra do seu nome?'
    }
  },
  {
    id: 'camera',
    name: 'Câmera',
    icon: 'Camera',
    shortDescription: 'Guarda momentos em fotos.',
    fullDescription: 'A câmera captura imagens e vídeos. Ela tem uma lente que vê tudo.',
    usage: 'Serve para registrar atividades e criar filmes.',
    witContext: 'Filmamos nossas apresentações para assistir depois.',
    challenge: 'Faça uma pose de capitão para uma foto!',
    imageAlt: 'Uma câmera preta com uma lente redonda no meio.',
    tts: {
      intro: 'Xis! A câmera vai capturar você.',
      content: 'A câmera serve para tirar fotos e vídeos. Ela guarda momentos. No WIT, usamos para filmar apresentações. Faça uma pose bem legal!'
    }
  },
  {
    id: 'tablet',
    name: 'Tablet',
    icon: 'Tablet',
    shortDescription: 'Computador que é só tela.',
    fullDescription: 'O tablet é leve e usamos tocando na tela com o dedo.',
    usage: 'Serve para jogos educativos, leitura e vídeos.',
    witContext: 'Usamos o tablet para jogar o jogo da memória.',
    challenge: 'Toque o dedo no ar como se estivesse arrastando um mapa.',
    imageAlt: 'Uma tela retangular fina e iluminada.',
    tts: {
      intro: 'É como uma carta de navegação digital!',
      content: 'O tablet é um computador de tela de toque. Serve para jogos e leitura. No WIT, usamos para jogar. Tente arrastar o dedo no ar.'
    }
  },
  {
    id: 'smart-bulb',
    name: 'Lâmpada Smart',
    icon: 'Lightbulb',
    shortDescription: 'Luz que muda de cor.',
    fullDescription: 'Esta lâmpada obedece comandos. Ela pode ficar azul, vermelha ou verde.',
    usage: 'Serve para iluminar e decorar o ambiente.',
    witContext: 'Deixamos a sala azul quando é hora de relaxar.',
    challenge: 'Que cor você escolheria para a sua cabine agora?',
    imageAlt: 'Uma lâmpada de LED comum, mas com luz colorida.',
    tts: {
      intro: 'Que farol bonito! Ele muda de cor.',
      content: 'A Lâmpada Inteligente muda de cor quando pedimos. Serve para decorar. No WIT, usamos luz azul para relaxar. Qual sua cor favorita?'
    }
  },
  {
    id: 'headset',
    name: 'Headset',
    icon: 'Headphones',
    shortDescription: 'Fones com microfone.',
    fullDescription: 'O headset ajuda a ouvir bem e falar usando o microfone.',
    usage: 'Serve para ouvir bem e falar usando o microfone.',
    witContext: 'Usamos para gravar histórias que criamos.',
    challenge: 'Coloque as mãos nas orelhas e diga "Oi" baixinho.',
    imageAlt: 'Fones de ouvido grandes com um microfone na ponta.',
    tts: {
      intro: 'Escute o som do mar! Com isso ouvimos tudo.',
      content: 'O headset serve para ouvir bem e falar usando o microfone. No WIT, gravamos histórias com ele. Diga oi baixinho!'
    }
  },
  {
    id: 'chroma',
    name: 'Chroma Key',
    icon: 'Maximize', 
    shortDescription: 'O pano verde mágico.',
    fullDescription: 'Um fundo verde que o computador troca por qualquer imagem.',
    usage: 'Serve para criar cenários incríveis em vídeos.',
    witContext: 'Ficamos invisíveis usando uma roupa verde na frente dele!',
    challenge: 'Se você pudesse navegar para qualquer lugar, onde estaria?',
    imageAlt: 'Um fundo de tecido verde brilhante.',
    tts: {
      intro: 'Magia no convés? Não, é tecnologia!',
      content: 'O Chroma Key é o fundo verde mágico. Serve para mudar o cenário dos vídeos. No WIT, brincamos de ficar invisíveis. Onde você gostaria de estar?'
    }
  },
  {
    id: 'smart-watch',
    name: 'Relógio Smart',
    icon: 'Watch',
    shortDescription: 'Relógio que faz tudo.',
    fullDescription: 'Um relógio que conta passos e mostra mensagens.',
    usage: 'Serve para ver as horas e cuidar da saúde.',
    witContext: 'Medimos quantos passos damos no recreio.',
    challenge: 'Pule 3 vezes para o relógio contar!',
    imageAlt: 'Um relógio de pulso com tela quadrada digital.',
    tts: {
      intro: 'Tic-tac, hora da aventura!',
      content: 'O Relógio Inteligente conta passos e mostra mensagens. Serve para saúde. No WIT, contamos nossos passos. Pule três vezes!'
    }
  }
];

// Teacher guide removed as per request
export const TEACHER_GUIDE = [];
