import "./CommentsWrapper.css";
import Comment from "../Comment/Comment";
import CurrentUserAvatar from "/images/avatars/image-juliusomo.png";
import NewComment from "../NewComment/NewComment";
import { useState , useEffect } from "react";
function CommentsWrapper() {
  const [comments, setComment] = useState(
    [
      {
        "id": 1,
        "avatar": "/images/avatars/image-amyrobson.png",
        "username": "amyrobson",
        "createdAt": "1 month ago",
        "score": 12,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
        "replies": []
      },
      {
        "id": 2,
        "avatar": "/images/avatars/image-maxblagun.png",
        "username": "maxblagun",
        "createdAt": "2 weeks ago",
        "score": 5,
        "content": "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "replies": [
          {
            "id": 1,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "username": "ramsesmiron",
            "avatar": "/images/avatars/image-ramsesmiron.png"
          },
          {
            "id": 2,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "username": "juliusomo",
            "avatar": "/images/avatars/image-juliusomo.png"
          }
        ]
      }
    ]
  );
  // useEffect(() => {
  //   function CallApi() {
  //     fetch("http://localhost:3000/comments")
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((finalResult) => {
  //         setComment(finalResult);
  //       });
  //   }
  //   CallApi();
  // }, []);
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

  function AddReply(commentId, replyContent , replyTo) {
    let newReply = {
      content: replyContent.startsWith("@" + replyTo + " ") ? replyContent.split("@" + replyTo + " ")[1] : replyContent,
      replyingTo: replyTo,
      username: "juliusomo",
      id: comments.find(comment => comment.id === commentId).replies.length + 1,
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

  function deleteComment(commentid) {
    const updatedComments = comments.filter(comment => comment.id !== commentid);
    setComment(updatedComments);
  }

  function deleteReply(commentId, replyId) {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) };
      }
      return comment;
    });
    setComment(updatedComments);
  }

  function editComment(commentId, newContent) {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content: newContent };
      }
      return comment;
    });
    setComment(updatedComments);
  }

  function editReply(commentId, replyId, newContent) {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === replyId) {
              return { ...reply, content: newContent };
            }
            return reply;
          })
        };
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
            commentid={comment.id}
            Avatar={comment.avatar}
            UserName={comment.username}
            CommentDate={comment.createdAt}
            Content={comment.content}
            Score={comment.score}
            Replies={comment.replies}
            AddReply={AddReply}
            deleteComment={deleteComment}
            deleteReply={deleteReply}
            editComment={editComment}
            editReply={editReply}
          />
        );
      })}
      <NewComment AddNewComment={AddComment} />
    </section>
  );
}
export default CommentsWrapper;
