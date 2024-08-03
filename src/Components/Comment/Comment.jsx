import "./Comment.css";
import ReplyIcon from "../../assets/images/icon-reply.svg";
import EditIcon from "../../assets/images/icon-edit.svg";
import DeleteIcon from "../../assets/images/icon-delete.svg";
import ScoreCounter from "../ScoreCounter/ScoreCounter";
import RepliesWrapper from "../RepliesWrapper/RepliesWrapper";

import { useState } from "react";
import ReplyForm from "../ReplyForm/ReplyForm";
import EditForm from "../EditForm/EditForm";
import DeleteModal from "../DeleteModal/DeleteModal";

function Comment(props) {
  const [isReply, setIsReply] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [replyingTextValue, setReplyingTextValue] = useState("");
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  function toggleOnReply() {
    setReplyingTextValue("@" + props.UserName + " ");
    setIsReply(!isReply);
  }

  function toggleOnEdit() {
    setIsEditingComment(!isEditingComment);
  }

  function toggleDeleteModal() {
    setIsDeleteModal(!isDeleteModal);
  }

  function handleAddReply() {
    props.AddReply(props.commentid, replyingTextValue, props.UserName);
    toggleOnReply();
  }

  function handleOnDelete() {
    if (props.ReplyId) {
      props.deleteReply(props.commentid, props.ReplyId);
    } else {
      props.deleteComment(props.commentid);
    }
    toggleDeleteModal();
  }

  function handleOnChangeReplyingText(e) {
    setReplyingTextValue(e.target.value);
  }

  function handleEditComment(content) {
    props.editComment(props.commentid, content);
    toggleOnEdit();
  }

  function handleEditReply(content) {
    props.editReply(props.commentid, props.ReplyId, content);
    toggleOnEdit();
  }

  return (
    <>
      {isDeleteModal && (
        <DeleteModal
          handleDelete={handleOnDelete}
          toggleDeleteModal={toggleDeleteModal}
        />
      )}
      <div className="comment">
        <ScoreCounter Score={props.Score} />
        <div className="commentHeader">
          <img src={props.Avatar} className="avatar" alt="user" />
          <p className="userName">{props.UserName}</p>
          {props.UserName === "juliusomo" && <div className="badge">you</div>}
          <p className="commentDate">{props.CommentDate}</p>
        </div>

        <div className="commentAction">
          {props.UserName === "juliusomo" ? (
            <>
              <button
                className="actionButton deleteButton"
                onClick={toggleDeleteModal}
              >
                <img src={DeleteIcon} alt="delete" />
                Delete
              </button>
              <button
                className="actionButton editButton"
                onClick={toggleOnEdit}
              >
                <img src={EditIcon} alt="edit" />
                Edit
              </button>
            </>
          ) : (
            <button
              onClick={toggleOnReply}
              className="actionButton replyButton"
            >
              <img src={ReplyIcon} className="replyIcon" alt="reply" />
              Reply
            </button>
          )}
        </div>

        <div className="commentBody">
          {isEditingComment ? (
            <EditForm
              Content={props.Content}
              onEdit={props.ReplyId ? handleEditReply : handleEditComment}
            />
          ) : (
            <p>
              {props.replyingTo && <span className="mention">@{props.replyingTo}, </span>}
              {props.Content}
            </p>
          )}
        </div>
      </div>

      {isReply && (
        <ReplyForm
          AddReply={handleAddReply}
          replyingTextValue={replyingTextValue}
          onChangeReplyText={handleOnChangeReplyingText}
        />
      )}

      {props.Replies && props.Replies.length > 0 && (
        <RepliesWrapper
          Replies={props.Replies}
          commentid={props.commentid}
          AddReply={props.AddReply}
          deleteReply={props.deleteReply}
          editReply={props.editReply}
        />
      )}
    </>
  );
}

export default Comment;
