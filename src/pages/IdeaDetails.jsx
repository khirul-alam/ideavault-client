import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const IdeaDetails = () => {
  useTitle("Details Ideas");  
  const { id } = useParams();
  const { user } = useAuth();
  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Idea load
  useEffect(() => {
    axios.get(`https://ideavault-server-one.vercel.app/ideas/${id}`)
      .then(res => setIdea(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  // Comments load
  const loadComments = () => {
    axios.get(`https://ideavault-server-one.vercel.app/comments/${id}`)
      .then(res => setComments(res.data));
  };

  useEffect(() => { loadComments(); }, [id]);

  // Add Comment
  const handleAddComment = async () => {
    if (!commentText.trim()) return toast.error("Comment cannot be empty!");
    try {
      await axios.post("https://ideavault-server-one.vercel.app/comments", {
        ideaId: id,
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
        commentText,
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("Comment added!");
      setCommentText("");
      loadComments();
    } catch {
      toast.error("Failed to add comment!");
    }
  };

  // Edit Comment
  const handleEditComment = async (commentId) => {
    try {
      await axios.put(`https://ideavault-server-one.vercel.app/comments/${commentId}`,
        { commentText: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Comment updated!");
      setEditId(null);
      loadComments();
    } catch {
      toast.error("Failed to update!");
    }
  };

  // Delete Comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://ideavault-server-one.vercel.app/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Comment deleted!");
      loadComments();
    } catch {
      toast.error("Failed to delete!");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!idea) return (
    <div className="text-center py-20">
      <p className="text-4xl mb-4">😕</p>
      <p className="text-xl">Idea not found!</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero Image */}
      {idea.imageURL && (
        <div className="rounded-2xl overflow-hidden mb-8 h-72">
          <img src={idea.imageURL} alt={idea.title}
            className="w-full h-full object-cover" />
        </div>
      )}

      {/* Title + Badge */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="badge badge-primary badge-lg">{idea.category}</span>
        {idea.tags?.map(tag => (
          <span key={tag} className="badge badge-ghost">{tag}</span>
        ))}
      </div>
      <h1 className="text-4xl font-bold mb-4">{idea.title}</h1>

      {/* Author */}
      <div className="flex items-center gap-3 mb-8">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={idea.authorPhoto || "https://i.ibb.co/5GzXkwq/user.png"}
              alt={idea.authorName} />
          </div>
        </div>
        <div>
          <p className="font-semibold">{idea.authorName}</p>
          <p className="text-sm text-base-content/50">
            {new Date(idea.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric"
            })}
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {idea.estimatedBudget && (
          <div className="bg-base-200 rounded-xl p-4">
            <p className="text-sm text-base-content/50 mb-1">💰 Estimated Budget</p>
            <p className="font-semibold">{idea.estimatedBudget}</p>
          </div>
        )}
        <div className="bg-base-200 rounded-xl p-4">
          <p className="text-sm text-base-content/50 mb-1">🎯 Target Audience</p>
          <p className="font-semibold">{idea.targetAudience}</p>
        </div>
      </div>

      {/* Sections */}
      {[
        { title: "📝 Short Description", content: idea.shortDescription },
        { title: "📖 Detailed Description", content: idea.detailedDescription },
        { title: "❗ Problem Statement", content: idea.problemStatement },
        { title: "✅ Proposed Solution", content: idea.proposedSolution },
      ].map((section, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-xl font-bold mb-3">{section.title}</h2>
          <div className="bg-base-200 rounded-xl p-5">
            <p className="text-base-content/80 leading-relaxed">{section.content}</p>
          </div>
        </div>
      ))}

      {/* ===== COMMENTS ===== */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          💬 Comments ({comments.length})
        </h2>

        {/* Add Comment */}
        {user ? (
          <div className="flex gap-3 mb-8">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                  alt={user.displayName} />
              </div>
            </div>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="textarea textarea-bordered w-full"
                rows={3}
              />
              <button
                onClick={handleAddComment}
                className="btn btn-primary btn-sm mt-2"
              >
                Post Comment
              </button>
            </div>
          </div>
        ) : (
          <div className="alert mb-6">
            <span>Please login to comment.</span>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-10 text-base-content/50">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className="flex gap-3">
                <div className="avatar">
                  <div className="w-9 rounded-full">
                    <img src={comment.userPhoto || "https://i.ibb.co/5GzXkwq/user.png"}
                      alt={comment.userName} />
                  </div>
                </div>
                <div className="flex-1 bg-base-200 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold">{comment.userName}</span>
                      <span className="text-xs text-base-content/50 ml-2">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {/* Edit/Delete - only own comments */}
                    {user?.email === comment.userEmail && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditId(comment._id); setEditText(comment.commentText); }}
                          className="btn btn-ghost btn-xs"
                        >✏️</button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="btn btn-ghost btn-xs text-error"
                        >🗑️</button>
                      </div>
                    )}
                  </div>

                  {/* Edit Mode */}
                  {editId === comment._id ? (
                    <div>
                      <textarea
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        className="textarea textarea-bordered w-full text-sm"
                        rows={2}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEditComment(comment._id)}
                          className="btn btn-primary btn-xs"
                        >Save</button>
                        <button
                          onClick={() => setEditId(null)}
                          className="btn btn-ghost btn-xs"
                        >Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-base-content/80">{comment.commentText}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;