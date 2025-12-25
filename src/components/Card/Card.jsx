function Card({ card, onClick }) {
  return (
    <div
      className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">❓</div>
        <div className="card-back">{card.symbol}</div>
      </div>
    </div>
  );
}

export default Card;
