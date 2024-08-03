import { useState } from 'react';
import './EditForm.css'
function EditForm(props) {
  const [editingContent, setEditingContent] = useState(props.Content);

  function handleEdit() {
    props.onEdit(editingContent);
  }

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

