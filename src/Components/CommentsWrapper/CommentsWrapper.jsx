import "./CommentsWrapper.css";
import Comment from "../Comment/Comment";
import UserAvatarOne from "../../assets/images/avatars/image-amyrobson.png";
import UserAvatarTwo from "../../assets/images/avatars/image-maxblagun.png";
import UserAvatarThree from "../../assets/images/avatars/image-ramsesmiron.png";
import CurrentUserAvatar from "../../assets/images/avatars/image-juliusomo.png";
import NewComment from "../NewComment/NewComment";
import { useState } from "react";
function CommentsWrapper() {
  const [comments, setComment] = useState([
    {
      id: 1,
      avatar: UserAvatarOne,
      username: "amyrobson",
      createdAt: "1 month ago",
      score: 12,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
      replies: [],
    },
    {
      id: 2,
      avatar: UserAvatarTwo,
      username: "maxblagun",
      createdAt: "2 weeks ago",
      score: 5,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          username: "ramsesmiron",
          avatar: UserAvatarThree,
          replies:[]
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          username: "juliusomo",
          avatar: CurrentUserAvatar,
          replies:[]
        },
      ],
    },
  ]);
  function AddComment(commentContent) {
    let newComment = {
      id: comments.length + 1,
      content: commentContent,
      avatar: CurrentUserAvatar,
      username: "juliusomo",
      createdAt: "now",
      score: 0,
      replies: [],
    };
    let newComments = [...comments, newComment];
    setComment(newComments);
  }

  function deleteComment(commentid) {
    let getcomments = comments.filter((comment) => {
      return comment.id != commentid;
    });
    setComment(getcomments);
  }

  function AddReply(commentId, replyContent) {
    let newReply = {
      likes: 0,
      content: replyContent,
      replyingTo: comments.find((comment) => comment.id === commentId).username,
      username: "juliusomo",
      id: commentId,
      createdAt: "now",
      avatar: CurrentUserAvatar,
      score: 0,
      replies: []
    };
    let updatedComments = comments.map((comment) => {
      if (comment.id == commentId) {
        return { ...comment, replies: [...comment.replies, newReply] };
      }
      return comment;
    });

    setComment(updatedComments);
  }
  return (
    <section id="commentsList">
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            deleteItem={deleteComment}
            uniqid={comment.id}
            Avatar={comment.avatar}
            UserName={comment.username}
            CommentDate={comment.createdAt}
            Content={comment.content}
            Score={comment.score}
            Replies={comment.replies}
            AddReply={AddReply}
          />
        );
      })}
      <NewComment AddNewComment={AddComment} />
    </section>
  );
}
export default CommentsWrapper;
