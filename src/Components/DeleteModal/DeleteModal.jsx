import "./DeleteModal.css";

function DeleteModal({ handleDelete, toggleDeleteModal }) {
  return (
    <div className="delete-modal-wrapper">
      <div className="delete-modal">
        <h1 className="delete-modal-title">Delete comment</h1>
        <p className="delete-modal-text">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="delete-btn-container">
          <button className="delete-back-btn" onClick={toggleDeleteModal}>
            No, back
          </button>
          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
