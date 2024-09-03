import PlusIcon from "/images/icon-plus.svg";
import MinuIcon from "/images/icon-minus.svg";
import "./ScoreCounter.css";
import useStore from "../../store/Comments";
function ScoreCounter({id , type, parentId}) {  
  const { scoreIncrement, scoreDecrement, comments } = useStore();
  const findScore = () => {
    if (type === "comment") {
      const comment = comments.find((comment) => comment.id === id);
      return comment ? comment.score : 0;
    } else if (type === "reply" && parentId) {
      const comment = comments.find((comment) => comment.id === parentId);
      const reply = comment?.replies.find((reply) => reply.id === id);
      return reply ? reply.score : 0;
    }
    return 0;
  };

  const currentScore = findScore();


  return (
    <div className="score">
      <button className="scorePlus" onClick={() => scoreIncrement(id, type, parentId)}>
        <img src={PlusIcon} alt="plus icon" />
      </button>
      <span className="scoreContent">{currentScore}</span>
      <button className="scoreMinus" onClick={() => scoreDecrement(id, type, parentId)}>
        <img src={MinuIcon} alt="minus icon" />
      </button>
    </div>
  );
}

export default ScoreCounter;