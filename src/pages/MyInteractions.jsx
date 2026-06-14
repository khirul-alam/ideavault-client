import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const MyInteractions = () => {
  useTitle("My Interactions");  
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`https://ideavault-server-one.vercel.app/comments/user/${user.email}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComments(res.data))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">My Interactions 💬</h1>
        <p className="text-base-content/60">All your comments and activities</p>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">💭</p>
          <p className="text-xl text-base-content/60">No interactions yet!</p>
          <Link to="/ideas" className="btn btn-primary mt-4">
            Explore Ideas
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-base-content/50 mb-4">
            Total comments: {comments.length}
          </p>
          {comments.map(comment => (
            <div key={comment._id} className="card bg-base-100 shadow hover:shadow-md transition-shadow">
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                          alt={user.displayName}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{user.displayName}</p>
                      <p className="text-xs text-base-content/50">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "long", day: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="badge badge-primary">Comment</span>
                </div>

                <p className="text-base-content/80 mt-3 bg-base-200 rounded-xl p-3">
                  {comment.commentText}
                </p>

                <div className="card-actions mt-2">
                  <Link
                    to={`/ideas/${comment.ideaId}`}
                    className="btn btn-ghost btn-sm text-primary"
                  >
                    View Idea →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInteractions;