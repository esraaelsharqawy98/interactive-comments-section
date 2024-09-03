import { useState } from "react";
import CurrentUserImg from '/images/avatars/image-juliusomo.png';
import useStore from '../../store/Comments';

function NewComment() {
  const [inputValue, setInputValue] = useState("");
  const { addComment, comments } = useStore();

  function handleAddComment() {
    if (inputValue.trim() === "") return;

    const newComment = {
      id: comments.length + 1,
      content: inputValue.trim(),
      avatar: CurrentUserImg,
      username: "juliusomo",
      createdAt: "now",
      score: 0,
      replies: [],
    };

    addComment(newComment);
    setInputValue("");
  }

  function handleOnChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="Form">
      <img src={CurrentUserImg} alt="Current user" />
      <textarea
        placeholder="Add a comment..."
        value={inputValue}
        onChange={handleOnChange}
        cols="30"
        rows="10"
      />
      <button onClick={handleAddComment}>SEND</button>
    </div>
  );
}

export default NewComment;