import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const Profile = () => {
  useTitle("Profile");
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    setLoading(true);
    try {
      await updateUserProfile(name, photo);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">My Profile 👤</h1>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                  alt={user?.displayName}
                />
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">{user?.displayName}</h2>
            <p className="text-base-content/60">{user?.email}</p>
          </div>

          <div className="divider">Update Profile</div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                type="url"
                name="photo"
                defaultValue={user?.photoURL}
                className="input input-bordered w-full"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;