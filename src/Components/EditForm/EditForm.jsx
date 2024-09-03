import { useState, useEffect } from 'react';
import './EditForm.css';
import useStore from '../../store/Comments';

function EditForm({ comment, setEditId, type }) {
  const { updateComment, updateReply } = useStore();
  const [editingContent, setEditingContent] = useState(comment.content);

  useEffect(() => {
    setEditingContent(comment.content);
  }, [comment]);

  const handleEdit = () => {
    if (editingContent.trim()) {
      if (type === 'comment') {
        updateComment(comment.id, editingContent);
      } else if (type === 'reply' && comment.parentId) {
        updateReply(comment.parentId, comment.id, editingContent);
      }
      setEditId(null);
    }
  };

  return (
    <div id='updateForm'>
      <textarea
        value={editingContent}
        onChange={(e) => setEditingContent(e.target.value)}
      />
      <button onClick={handleEdit} id='updateButton'>UPDATE</button>
    </div>
  );
}

export default EditForm;
