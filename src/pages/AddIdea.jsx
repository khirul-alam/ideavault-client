import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
const categories = ["Tech", "Health", "AI", "Education", "Finance", "Other"];

const AddIdea = () => {
  useTitle("Add Idea");
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const ideaData = {
      title: form.title.value,
      shortDescription: form.shortDescription.value,
      detailedDescription: form.detailedDescription.value,
      category: form.category.value,
      tags: form.tags.value.split(",").map(t => t.trim()).filter(Boolean),
      imageURL: form.imageURL.value,
      estimatedBudget: form.estimatedBudget.value,
      targetAudience: form.targetAudience.value,
      problemStatement: form.problemStatement.value,
      proposedSolution: form.proposedSolution.value,
      authorEmail: user.email,
      authorName: user.displayName,
      authorPhoto: user.photoURL,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/ideas", ideaData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Idea submitted successfully! 🎉");
      navigate("/my-ideas");
    } catch (err) {
      toast.error("Failed to submit idea!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Share Your Idea 💡</h1>
        <p className="text-base-content/60">
          Fill in the details below to submit your startup idea
        </p>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Idea Title *</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. AI-powered study assistant"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Short Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Short Description *</span>
              </label>
              <input
                type="text"
                name="shortDescription"
                placeholder="One line summary of your idea"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Detailed Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Detailed Description *</span>
              </label>
              <textarea
                name="detailedDescription"
                placeholder="Describe your idea in detail..."
                className="textarea textarea-bordered w-full h-32"
                required
              />
            </div>

            {/* Category + Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Category *</span>
                </label>
                <select name="category" className="select select-bordered w-full" required>
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Estimated Budget</span>
                </label>
                <input
                  type="text"
                  name="estimatedBudget"
                  placeholder="e.g. $10,000"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Image URL</span>
              </label>
              <input
                type="url"
                name="imageURL"
                placeholder="https://your-image-url.com"
                className="input input-bordered w-full"
              />
            </div>

            {/* Tags */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Tags</span>
                <span className="label-text-alt text-base-content/50">comma separated</span>
              </label>
              <input
                type="text"
                name="tags"
                placeholder="e.g. AI, SaaS, Mobile"
                className="input input-bordered w-full"
              />
            </div>

            {/* Target Audience */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Target Audience *</span>
              </label>
              <input
                type="text"
                name="targetAudience"
                placeholder="e.g. College students aged 18-25"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Problem Statement */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Problem Statement *</span>
              </label>
              <textarea
                name="problemStatement"
                placeholder="What problem does your idea solve?"
                className="textarea textarea-bordered w-full h-24"
                required
              />
            </div>

            {/* Proposed Solution */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Proposed Solution *</span>
              </label>
              <textarea
                name="proposedSolution"
                placeholder="How does your idea solve the problem?"
                className="textarea textarea-bordered w-full h-24"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-full btn-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit Idea 🚀"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIdea;