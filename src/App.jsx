import { useState, useEffect } from "react";
import Title from "./components/Title/Title";
import Card from "./components/Card/Card";
import Button from "./components/Button/Button";
import "./App.css";

const symbols = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍍"];

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

  return (
    <div className="app">
      <Title text="Jeu de Memory" />

      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => console.log(card)}
          />
        ))}
      </div>

      <Button text="Rejouer" onClick={() => console.log("reset")} />

      {hasWon && <p>🎉 Bravo, vous avez gagné !</p>}
    </div>
  );
}

export default App;
