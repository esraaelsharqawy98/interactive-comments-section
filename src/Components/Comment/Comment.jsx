import "./Comment.css";
import ReplyIcon from "../../assets/images/icon-reply.svg";
import EditIcon from "../../assets/images/icon-edit.svg";
import DeleteIcon from "../../assets/images/icon-delete.svg";
import ScoreCounter from "../ScoreCounter/ScoreCounter";
import RepliesWrapper from "../RepliesWrapper/RepliesWrapper";

import { useState } from "react";
import ReplyForm from "../ReplyForm/ReplyForm";
function Comment(props) {
  
  const [isReply, setReply] = useState(false);

  function handleAddReply(replyContent) {
    const replyWithMention = replyContent;
    props.AddReply(props.uniqid, replyWithMention);
    setReply(false);
 
  }

  function toggleOnReply() {
    setReply((prev) => !prev);
  }

  function handleOnDelte(event) {
    props.deleteItem(event.target.getAttribute("uniqid"));
  }


  return (
    <>
      <div className="comment">
        <ScoreCounter Score={props.Score} />

        <div className="commentHeader">
          <img src={props.Avatar} className="avatar" alt="user image" />
          <p className="userName">{props.UserName}</p>

          {props.UserName == "juliusomo" &&
             (<div className="badge">you</div>)
          }

          <p className="commentDate">{props.CommentDate}</p>
        </div>

        <div className="commentAction">
          {props.UserName == "juliusomo" ? (
            <>
              <button
                className="actionButton deleteButton"
                uniqid={props.uniqid}
                onClick={handleOnDelte}
              >
                <img src={DeleteIcon} alt="delete icon" />
                Delete
              </button>
              <button className="actionButton editButton" uniqid={props.uniqid}>
                <img src={EditIcon} alt="edit icon" />
                Edit
              </button>
            </>
          ) : (<button uniqid={props.uniqid} onClick={toggleOnReply} className="actionButton replyButton">
          <img src={ReplyIcon} className="replyIcon" alt="reply icon" />
          Reply
      </button>)
          }
          
        </div>
        <div className="commentBody">
          <p>{ props.Content}</p>
        </div>
      </div>

      {isReply && 
        (<ReplyForm AddReply={handleAddReply} replyingTo={props.UserName} />)
      }

      {props.Replies && props.Replies.length > 0 && (
          <RepliesWrapper Replies={props.Replies} AddReply={props.AddReply} deleteItem={props.deleteItem}/>
      )
      }
      
      
    </>
  );
}
export default Comment;
