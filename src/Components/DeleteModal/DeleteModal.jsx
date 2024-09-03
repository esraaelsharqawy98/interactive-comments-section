import "./DeleteModal.css";
import useStore from '../../store/Comments';

function DeleteModal({ parentId, type }) {
  const { deleteComment, deleteReply, toggleVisibility, visibility ,comments } = useStore();

  const isDeleteModalVisible = visibility[parentId]?.showDeleteModal || false;

  const handleConfirmDelete = () => {
    if (type === "comment") {
      deleteComment(parentId);
    } else if (type === "reply") {
      const comment = comments.find(c => c.replies.some(reply => reply.id === parentId));
      if (comment) {
        const reply = comment.replies.find(r => r.id === parentId);
        if (reply) {
          deleteReply(comment.id, reply.id);
        }
      }
    }
    toggleVisibility(parentId, 'showDeleteModal');
  };

  if (!isDeleteModalVisible) return null;

  return (
    <div className="delete-modal-wrapper">
      <div className="delete-modal">
        <h1 className="delete-modal-title">
          Delete {type === "comment" ? "comment" : "reply"}
        </h1>
        <p className="delete-modal-text">
          Are you sure you want to delete this {type}? This will remove the {type} and can't be undone.
        </p>
        <div className="delete-btn-container">
          <button className="delete-back-btn" onClick={() => toggleVisibility(parentId, 'showDeleteModal')}>
            No, back
          </button>
          <button className="delete-btn" onClick={handleConfirmDelete}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;