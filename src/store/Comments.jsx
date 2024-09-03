import { create } from "zustand";

const useStore = create((set) => ({
  comments: [
    {
      id: 1,
      avatar: "/images/avatars/image-amyrobson.png",
      username: "amyrobson",
      createdAt: "1 month ago",
      score: 12,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
      replies: [],
    },
    {
      id: 2,
      avatar: "/images/avatars/image-maxblagun.png",
      username: "maxblagun",
      createdAt: "2 weeks ago",
      score: 5,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      replies: [
        {
          id: 1,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          username: "ramsesmiron",
          avatar: "/images/avatars/image-ramsesmiron.png",
        },
        {
          id: 2,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          username: "juliusomo",
          avatar: "/images/avatars/image-juliusomo.png",
        },
      ],
    },
  ],
  addComment: (comment) =>
    set((state) => ({
      comments: [...state.comments, comment],
    })),

    addReply: (commentid, reply) =>
    set((state) => {
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === commentid) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          };
        }
        return comment;
      });
      return { comments: updatedComments };
    }),

  updateComment: (id, updatedContent) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === id ? { ...comment, content: updatedContent } : comment
      ),
    })),

  updateReply: (commentId, replyId, updatedContent) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, content: updatedContent }
                  : reply
              ),
            }
          : comment
      ),
    })),

  deleteComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== id),
    })),

  deleteReply: (commentId, replyId) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.filter((reply) => reply.id !== replyId),
            }
          : comment
      ),
    })),

  scoreIncrement: (id, type, parentId = null) =>
    set((state) => ({
      comments: state.comments.map((comment) => {
        if (type === "comment" && comment.id === id) {
          return { ...comment, score: comment.score + 1 };
        } else if (type === "reply" && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === id ? { ...reply, score: reply.score + 1 } : reply
            ),
          };
        }
        return comment;
      }),
    })),

  scoreDecrement: (id, type, parentId = null) =>
    set((state) => ({
      comments: state.comments.map((comment) => {
        if (type === "comment" && comment.id === id) {
          return { ...comment, score: comment.score - 1 };
        } else if (type === "reply" && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === id ? { ...reply, score: reply.score - 1 } : reply
            ),
          };
        }
        return comment;
      }),
    })),
    visibility: {},
  
    toggleVisibility: (id, formType) => 
      set((state) => ({
        visibility: {
          ...state.visibility,
          [id]: {
            ...state.visibility[id],
            [formType]: !state.visibility[id]?.[formType],
          },
        },
      })),
}));

export default useStore;