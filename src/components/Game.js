import "./Game.css";

import { useState, useRef } from "react";

const Game = ({
    verificarLetra, 
    palavraEscolhida, 
    categoriaEscolhida, 
    letras, 
    palpites, 
    erros, 
    chutes, 
    pontos,
}) => {
    const [letra, setLetra] = useState("");
    const letraInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        verificarLetra(letra);

        setLetra("");

        letraInputRef.current.focus();
    }

  return (
    <div className="jogo">
        <p className="pontos">
            <span>Pontuação: {pontos}</span>
        </p>
        <h1>Qual é a palavra?</h1>
        <h3 className="tip">
            Dica: <span>{categoriaEscolhida}</span>
        </h3>
        <p>Você ainda tem {chutes} palpite(s).</p>
        <div className="palavraContainer">
            {letras.map((letra, i) => (
                palpites.includes(letra) ? (
                    <span key={i} className="letra">{letra}</span>
                ) : (
                    <span key={i} className="emBranco"></span>
                )
            ))}
        </div>
        <div className="letraContainer">
            <p>Adivinhe uma letra:</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="letra" 
                    maxLength="1" 
                    required 
                    onChange={(e) => setLetra(e.target.value)}
                    value={letra}
                    ref={letraInputRef}
                />
                <button>Palpitar</button>
            </form>
        </div>
        <div className="palavrasErradasContainer">
            <p>Letras arriscadas nessa palavra:</p>
            {erros.map((letra, i) => (
                <span key={i}>{letra} / </span>
            ))}
            <div className="record">
                <h3>PONTUAÇÃO MÁXIMA ATINGIDA: 2100 PTS</h3>
            </div>
        </div>
    </div>
  );
};

export default Game