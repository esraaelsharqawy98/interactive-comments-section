import { useState, useEffect } from 'react';
import './EditForm.css';
import useStore from '../../store/Comments';

function EditForm({ commentid, type, parentId }) {
  const { comments, updateComment, toggleVisibility, updateReply } = useStore();

  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const getInitialContent = () => {
      if (type === 'comment') {
        const comment = comments.find(c => c.id === commentid);
        return comment ? comment.content : '';
      } else if (type === 'reply' && parentId) {
        const parentComment = comments.find(c => c.id === parentId);
        const reply = parentComment ? parentComment.replies.find(r => r.id === commentid) : null;
        return reply ? reply.content : '';
      }
      return '';
    };

    setEditingContent(getInitialContent());
  }, [comments, commentid, type, parentId]);

  const handleEdit = () => {
    if (editingContent.trim()) {
      if (type === 'comment') {
        updateComment(commentid, editingContent);
      } else if (type === 'reply' && parentId) {
        const parentComment = comments.find(c => c.id === parentId);
        if (parentComment) {
          const reply = parentComment.replies.find(r => r.id === commentid);
          if (reply) {
            updateReply(parentComment.id, reply.id, editingContent);
          }
        }
      }
      toggleVisibility(commentid, 'showEditForm');
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
