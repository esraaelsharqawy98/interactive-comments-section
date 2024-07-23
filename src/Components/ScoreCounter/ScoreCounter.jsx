import PlusIcon from "../../assets/images/icon-plus.svg";
import MinuIcon from "../../assets/images/icon-minus.svg";
import "./ScoreCounter.css";
import { useState } from "react";

function ScoreCounter() {

  const [score, setScore] = useState(0);
  
  //increment score  
  function Increment() {
    let newScore = score + 1;
    setScore(newScore);
  }
  
  //decrement score
  function Decrement() {
    let newScore = score - 1;
    setScore(newScore);
  }

  return (
    <div className="score">
      <button className="scorePlus" onClick={Increment}>
        <img src={PlusIcon} alt="plus icon" />
      </button>
      <span className="scoreContent">{score}</span>
      <button className="scoreMinus" onClick={Decrement}>
        <img src={MinuIcon} alt="minus icon" />
      </button>
    </div>
  );
}
export default ScoreCounter;
