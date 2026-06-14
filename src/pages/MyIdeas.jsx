import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const MyIdeas = () => {
  useTitle("My Ideas");  
  const { user } = useAuth();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editIdea, setEditIdea] = useState(null);

  const token = localStorage.getItem("token");

  const loadMyIdeas = () => {
    axios.get("https://ideavault-server-one.vercel.app/ideas", {
      params: { email: user.email }
    })
    .then(res => {
      const myIdeas = res.data.filter(idea => idea.authorEmail === user.email);
      setIdeas(myIdeas);
    })
    .finally(() => setLoading(false));
  };

  useEffect(() => { loadMyIdeas(); }, []);

  // Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`https://ideavault-server-one.vercel.app/ideas/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Idea deleted!");
      setDeleteId(null);
      loadMyIdeas();
    } catch {
      toast.error("Failed to delete!");
    }
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      shortDescription: form.shortDescription.value,
      category: form.category.value,
      targetAudience: form.targetAudience.value,
    };
    try {
      await axios.put(`https://ideavault-server-one.vercel.app/ideas/${editIdea._id}`, updated, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Idea updated!");
      setEditIdea(null);
      loadMyIdeas();
    } catch {
      toast.error("Failed to update!");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">My Ideas 💡</h1>
        <p className="text-base-content/60">Manage your submitted startup ideas</p>
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-xl text-base-content/60">You haven't shared any ideas yet!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea, i) => (
                <tr key={idea._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded">
                          <img src={idea.imageURL || "https://placehold.co/40x40"} alt={idea.title} />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">{idea.title}</p>
                        <p className="text-xs text-base-content/50 line-clamp-1">
                          {idea.shortDescription}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-primary">{idea.category}</span></td>
                  <td className="text-sm text-base-content/60">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditIdea(idea)}
                        className="btn btn-sm btn-info"
                      >✏️ Edit</button>
                      <button
                        onClick={() => setDeleteId(idea._id)}
                        className="btn btn-sm btn-error"
                      >🗑️ Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== DELETE MODAL ===== */}
      {deleteId && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error">⚠️ Delete Idea</h3>
            <p className="py-4 text-base-content/70">
              Are you sure you want to delete this idea? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button onClick={() => setDeleteId(null)} className="btn btn-ghost">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn btn-error">
                Yes, Delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDeleteId(null)}></div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {editIdea && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">✏️ Edit Idea</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Title</span></label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editIdea.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Short Description</span></label>
                <input
                  type="text"
                  name="shortDescription"
                  defaultValue={editIdea.shortDescription}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Category</span></label>
                <select name="category" defaultValue={editIdea.category} className="select select-bordered w-full">
                  {["Tech","Health","AI","Education","Finance","Other"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Target Audience</span></label>
                <input
                  type="text"
                  name="targetAudience"
                  defaultValue={editIdea.targetAudience}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="modal-action">
                <button type="button" onClick={() => setEditIdea(null)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setEditIdea(null)}></div>
        </div>
      )}
    </div>
  );
};

export default MyIdeas;