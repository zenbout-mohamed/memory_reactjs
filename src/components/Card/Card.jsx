function Card({ card, onClick }) {
  return (
    <div onClick={onClick}>
      {card.flipped ? card.symbol : "❓"}
    </div>
  );
}

export default Card;
