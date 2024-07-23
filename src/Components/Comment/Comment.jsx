import "./Comment.css";
import ReplyIcon from "../../assets/images/icon-reply.svg";
import ScoreCounter from "../ScoreCounter/ScoreCounter";
function Comment(props) {
  return (
    <div className="comment">
      <ScoreCounter />
      <div className="commentHeader">
        <img src={props.Avatar} className="avatar" alt="user image" />
        <p className="userName">{props.UserName}</p>
        <p className="commentDate">{props.CommentDate}</p>
      </div>
      <div className="commentAction">
        <a href="#" className="replyButton">
          <img src={ReplyIcon} className="replyIcon" alt="reply icon"/>
          Reply
        </a>
      </div>
      <div className="commentBody">
        <p>{props.Content}</p>
      </div>
    </div>
  );
}
export default Comment;
