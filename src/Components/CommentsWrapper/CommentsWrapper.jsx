import "./CommentsWrapper.css";
import Comment from "../Comment/Comment";
import UserAvatarOne from "../../assets/images/avatars/image-amyrobson.png";
import UserAvatarTwo from "../../assets/images/avatars/image-maxblagun.png";
function CommentsWrapper() {
  let comments = [
    {
      id: 1,
      avatar: UserAvatarOne ,
      username: "amyrobson",
      createdAt:"1 month ago",
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
    },
    {
      id: 2,
      avatar: UserAvatarTwo,
      username: "maxblagun",
      createdAt:"2 weeks ago",
      content:
        "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    },
  ];
  return (
    <section id="commentsList">
      {comments.map((comment) => {
        return <Comment key={comment.id} Avatar={comment.avatar} UserName={comment.username} CommentDate={comment.createdAt} Content={comment.content}/>;
      })}
    </section>
  );
}
export default CommentsWrapper;
