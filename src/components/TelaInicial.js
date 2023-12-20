import "./TelaInicial.css"

const StartScreen = ({inicio}) => {
  return (
    <div className="start">
      <h1>Palavra Secreta</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={inicio}>Iniciar o jogo</button>
    </div>
  );
};

export default StartScreen;