import "./CommentsWrapper.css";
import Comment from "../Comment/Comment";
import CurrentUserAvatar from "/images/avatars/image-juliusomo.png";
import NewComment from "../NewComment/NewComment";
import { useState , useEffect } from "react";
function CommentsWrapper() {
  const [comments, setComment] = useState([]);
  useEffect(() => {
    function CallApi() {
      fetch("http://localhost:3000/comments")
        .then((response) => {
          return response.json();
        })
        .then((finalResult) => {
          setComment(finalResult);
        });
    }
    CallApi();
  }, []);
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
