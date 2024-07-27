import Comment from "../Comment/Comment";
import "./RepliesWrapper.css";

function RepliesWrapper(props) {
  return (
    <section id="repliesWrapper">
      <div className="divider"></div>
      <div className="repliesList">
        {props.Replies.map((reply) => (
          <Comment
            key={reply.id}
            uniqid={reply.id}
            Avatar={reply.avatar}
            UserName={reply.username}
            CommentDate={reply.createdAt}
            Content={reply.content}
            Replies={reply.replies}
            Score={reply.score}
            AddReply={props.AddReply}
            deleteItem={props.deleteItem}
          />
        ))}
      </div>
    </section>
  );
}

export default RepliesWrapper;