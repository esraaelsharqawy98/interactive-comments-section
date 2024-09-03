import { useState } from 'react';
import CurrentUserImg from '/images/avatars/image-juliusomo.png';
import useStore from '../../store/Comments';

function ReplyForm({ comment, type, setreplyid }) {
  const { addReply } = useStore();
  const [replyingTextValue, setReplyingTextValue] = useState("");

  const handleAddReply = () => {
    const replyTo = comment.username;
    const replyContent = replyingTextValue.trim();

    if (!replyContent) return;
    
    const formattedReplyContent = replyContent.startsWith(`@${replyTo} `)
      ? replyContent
      : `@${replyTo} ${replyContent}`;

    const replies = comment.replies || [];
    const newReplyId = replies.length > 0 ? replies[replies.length - 1].id + 1 : 1;

    const newReply = {
      content: formattedReplyContent.slice(replyTo.length + 2),
      type: 'reply',
      parentId: comment.id,
      replyingTo: replyTo,
      username: "juliusomo",
      id: newReplyId,
      createdAt: "now",
      avatar: CurrentUserImg,
      score: 0,
    };

    addReply(comment.id, newReply);
    setReplyingTextValue(""); 
    setreplyid(null);
  };

  const handleOnChangeReplyingText = (e) => {
    setReplyingTextValue(e.target.value);
  };

  return (
    <div className="Form">
      <img src={CurrentUserImg} alt="current user" />
      <textarea
        value={replyingTextValue}
        onChange={handleOnChangeReplyingText}
      />
      <button onClick={handleAddReply}>REPLY</button>
    </div>
  );
}

export default ReplyForm;
