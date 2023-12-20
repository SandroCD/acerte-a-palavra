import "./GameOver.css"

const GameOver = ({ reinicio, pontos }) => {
  return (
    <div>
      <h1>FIM DE JOGO</h1>
      <h2>
        Você fez <span>{pontos}</span> pontos!
      </h2>
      <button onClick={reinicio}>Tente novamente</button>
    </div>
  );
};

export default GameOver;