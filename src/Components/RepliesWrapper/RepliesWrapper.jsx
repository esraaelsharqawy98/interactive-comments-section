import Comment from "../Comment/Comment";
import "./RepliesWrapper.css";

function RepliesWrapper(props) {
  return (
    <section id="repliesWrapper">
      <div className="repliesList">
        {props.Replies.map((reply) => (
          <Comment
            key={reply.id}
            ReplyId={reply.id}
            commentid={props.commentid}
            Avatar={reply.avatar}
            UserName={reply.username}
            CommentDate={reply.createdAt}
            Content={reply.content}
            Score={reply.score}
            replyingTo={reply.replyingTo}
            AddReply={props.AddReply}
            deleteReply={props.deleteReply}
            editReply={props.editReply}
          />
        ))}
      </div>
    </section>
  );
}

export default RepliesWrapper;