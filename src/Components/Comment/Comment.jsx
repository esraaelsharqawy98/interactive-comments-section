import useStore from "../../store/Comments";
import ReplyIcon from "/images/icon-reply.svg";
import EditIcon from "/images/icon-edit.svg";
import DeleteIcon from "/images/icon-delete.svg";
import ScoreCounter from "../ScoreCounter/ScoreCounter";
import RepliesWrapper from "../RepliesWrapper/RepliesWrapper";
import ReplyForm from "../ReplyForm/ReplyForm";
import EditForm from "../EditForm/EditForm";
import DeleteModal from "../DeleteModal/DeleteModal";
import './Comment.css';

function Comment({ comment, type = "comment", parentId = null }) {
  const { toggleVisibility, visibility } = useStore();

  const isReplyFormVisible = visibility[comment.id]?.showReplyForm || false;
  const isEditFormVisible = visibility[comment.id]?.showEditForm || false;
  const isDeleteModalVisible = visibility[comment.id]?.showDeleteModal || false;

  const handleToggleReplyForm = () => toggleVisibility(comment.id, 'showReplyForm');
  const handleToggleEditForm = () => toggleVisibility(comment.id, 'showEditForm');
  const handleToggleDeleteModal = () => toggleVisibility(comment.id, 'showDeleteModal');

  return (
    <>
      <div className="comment">
        <ScoreCounter id={comment.id} type={type} parentId={parentId} />

        <div className="commentHeader">
          <img src={comment.avatar} className="avatar" alt={`${comment.username}'s avatar`} />
          <p className="userName">{comment.username}</p>
          {comment.username === "juliusomo" && <div className="badge">you</div>}
          <p className="commentDate">{comment.createdAt}</p>
        </div>

        <div className="commentAction">
          {comment.username === "juliusomo" ? (
            <>
              <button
                className="actionButton deleteButton"
                onClick={handleToggleDeleteModal}
                aria-label="Delete comment"
              >
                <img src={DeleteIcon} alt="delete" />
                Delete
              </button>
              <button
                className="actionButton editButton"
                onClick={handleToggleEditForm}
                aria-label="Edit comment"
              >
                <img src={EditIcon} alt="edit" />
                Edit
              </button>
            </>
          ) : (
            <button
              onClick={handleToggleReplyForm}
              className="actionButton replyButton"
              aria-label="Reply to comment"
            >
              <img src={ReplyIcon} className="replyIcon" alt="reply" />
              Reply
            </button>
          )}
        </div>

        <div className="commentBody">
          {isEditFormVisible ? (
            <EditForm commentid={comment.id} parentId={parentId} type={type} />
          ) : (
            <p>
              {comment.replyingTo && (
                <span className="mention">@{comment.replyingTo}, </span>
              )}
              {comment.content}
            </p>
          )}
        </div>
      </div>

      {isDeleteModalVisible && <DeleteModal parentId={comment.id} type={type} />}
      {isReplyFormVisible && <ReplyForm parentId={comment.id} type={type} />}
      {comment.replies && <RepliesWrapper replies={comment.replies} parentId={comment.id} />}
    </>
  );
}

export default Comment;
