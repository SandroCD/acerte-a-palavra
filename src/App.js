// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from "react";

// Data
import { listaDePalavras } from './data/palavras';

// Components
import StartScreen from './components/TelaInicial';
import GameOver from './components/GameOver';
import Game from './components/Game';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const totalDeErros = 10

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [palavras] = useState(listaDePalavras);

  const [palavraEscolhida, setPalavraEscolhida] = useState("");
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("");
  const [letras, setLetras] = useState([]); 

  const [palpites, setPalpites] = useState([]);
  const [erros, setErros] = useState([]);
  const [chutes, setChutes] = useState(totalDeErros);
  const [pontos, setPontos] = useState(0);

  const escolhaPalavraECategoria = useCallback(() => {
    // pegue uma categoria aleatória
    const categorias = Object.keys(palavras)
    const categoria = 
      categorias[Math.floor(Math.random() * Object.keys(categorias).length)];


    // pegue uma palavra aleatória
    const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)];

    return { palavra, categoria };
  }, [palavras]);

  // iniciar o jogo
  const inicio = useCallback(() => {
    // limpar todas as letras
    limparEstadoLetras();

    // pegue a palavra e a categoria
    const { palavra, categoria } = escolhaPalavraECategoria();

    // crie om array de letras
    let letrasDaPalavra = palavra.split("");

    letrasDaPalavra = letrasDaPalavra.map((l) => l.toLowerCase());

    // setar os status
    setPalavraEscolhida(palavra);
    setCategoriaEscolhida(categoria);
    setLetras(letrasDaPalavra);

    setGameStage(stages[1].name);
  }, [escolhaPalavraECategoria]);

  // processar a letra no input
  const verificarLetra = (letra) => {
    
    const padronizarLetra = letra.toLowerCase()

    // verificar se a letra pode ser usada
    if(palpites.includes(padronizarLetra) || erros.includes(padronizarLetra)
    ) {
    return;
  };

  // após cada palpite remova uma tentativa restante
    if(letras.includes(padronizarLetra)) {
      setPalpites((letrasChutadasAtuais) => [
        ...letrasChutadasAtuais, 
        padronizarLetra,
      ])
    } else {
      setErros((letrasErradasAtuais) => [
        ...letrasErradasAtuais, 
        padronizarLetra,
      ])

      setChutes((chutesAtuais) => chutesAtuais - 1);
    };
  };

  const limparEstadoLetras = () => {
    setPalpites([]);
    setErros([]);
  };

  // verificar se os chutes acabaram
  useEffect(() => {
    if(chutes <= 0) {
      // resetar o estado das letras
      limparEstadoLetras();

      setGameStage(stages[2].name);
    }
  }, [chutes])

  // checar win condition
  useEffect (() => {

    const letrasUnicas = [...new Set(letras)]

    // win condition
    if(palpites.length === letrasUnicas.length) {
      // somar os pontos
      setPontos((pontosAtuais) => (pontosAtuais += 100));

      // reiniciar o jogo com uma nova palavra
      inicio();
    }
  }, [palpites, letras, inicio]);

  // reinicio do jogo
  const reinicio = () => {
    setPontos(0);
    setChutes(totalDeErros);

    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen inicio={inicio} />}
      {gameStage === "game" && (
        <Game 
          verificarLetra={verificarLetra} 
          palavraEscolhida={palavraEscolhida} 
          categoriaEscolhida={categoriaEscolhida} 
          letras={letras}
          palpites={palpites}
          erros={erros}
          chutes={chutes}
          pontos={pontos}
        />
      )};
      {gameStage === "end" && <GameOver reinicio={reinicio} pontos={pontos}/>}
    </div>
  );
};

export default App;
