import { useState, useEffect } from "react";
import Title from "./components/Title/Title";
import Card from "./components/Card/Card";
import Button from "./components/Button/Button";
import "./App.css";

/* Symboles des cartes */
const symbols = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍"];

/* Génération et mélange des cartes */
function generateCards() {
  const duplicated = [...symbols, ...symbols];
  return duplicated
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false,
    }));
}

function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  /* Initialisation des cartes */
  useEffect(() => {
    resetGame();
  }, []);

  /* Timer */
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  /* Gestion du clic sur une carte */
  function handleCardClick(card) {
    if (lockBoard || card.flipped || card.matched) return;

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === card.id ? { ...c, flipped: true } : c
      )
    );

    if (!firstCard) {
      setFirstCard(card);
      if (!timerActive) setTimerActive(true);
    } else {
      setSecondCard(card);
      setLockBoard(true);
      setMoves((m) => m + 1);
    }
  }

  /* Comparaison des cartes */
  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.symbol === secondCard.symbol) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.symbol === firstCard.symbol
              ? { ...card, matched: true }
              : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  /* Réinitialisation du tour */
  function resetTurn() {
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
  }

  /* Détection de la victoire */
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setHasWon(true);
      setTimerActive(false);
    }
  }, [cards]);

  /* Rejouer */
  function resetGame() {
    setCards(generateCards());
    setFirstCard(null);
    setSecondCard(null);
    setLockBoard(false);
    setHasWon(false);
    setMoves(0);
    setTime(0);
    setTimerActive(false);
  }

  return (
    <div className="app">
      <Title text="Jeu de Memory" />

      <div className="stats">
        <p>⏱️ Temps: {time}s</p>
        <p>🔄 Coups: {moves}</p>
      </div>

      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      <Button text="Rejouer" onClick={resetGame} />

      {hasWon && (
        <p className="win-message">
          🎉 Bravo, vous avez gagné en {moves} coups et {time}s !
        </p>
      )}
    </div>
  );
}

export default App;
