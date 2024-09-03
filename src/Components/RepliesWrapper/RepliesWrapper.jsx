import Comment from "../Comment/Comment";
import "./RepliesWrapper.css";

function RepliesWrapper({replies,parentId}) {
  console.log('RepliesWrapper parentId:', parentId);
  console.log('RepliesWrapper replies:', replies);
  return (
    <section id="repliesWrapper">
      <div className="repliesList">
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            type="reply"
            parentId={parentId}
          />
        ))}
      </div>
    </section>
  );
}

export default RepliesWrapper;