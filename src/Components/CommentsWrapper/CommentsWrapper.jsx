import "./CommentsWrapper.css";
import useStore from '../../store/Comments'
import Comment from "../Comment/Comment";
import NewComment from "../NewComment/NewComment";
function CommentsWrapper() {
  const {comments} = useStore();
  return (
    <section id="commentsList">
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
          />
        );
      })}
      <NewComment/>
    </section>
  );
}
export default CommentsWrapper;