import { useState } from 'react';
import CurrentUserImg from '/images/avatars/image-juliusomo.png';
import useStore from '../../store/Comments';

function ReplyForm({ parentId, type }) {
  const { addReply, comments, toggleVisibility } = useStore();
  const [replyingTextValue, setReplyingTextValue] = useState("");

  const findComment = () => {
    if (type === "comment") {
      return comments.find(c => c.id === parentId);
    } else if (type === "reply") {
      for (const c of comments) {
        const reply = c.replies.find(r => r.id === parentId);
        if (reply) {
          return { ...reply, parentId: c.id };
        }
      }
    }
    return null;
  };

  const comment = findComment();

  const handleAddReply = () => {
    if (comment) {
      setReplyingTextValue(`@${comment.username} `);
    }
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
    toggleVisibility(comment.id, "showReplyForm");
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