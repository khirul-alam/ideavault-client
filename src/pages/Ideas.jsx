import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import IdeaCard from "../components/IdeaCard";
import useTitle from "../hooks/useTitle";

const categories = ["All", "Tech", "Health", "AI", "Education", "Finance", "Other"];

const Ideas = () => {
  useTitle("Explore Ideas");  
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (selectedCategory !== "All") params.category = selectedCategory;

    const timer = setTimeout(() => {
      axios.get("https://ideavault-server-one.vercel.app/ideas", { params })
        .then(res => setIdeas(res.data))
        .catch(() => setIdeas([]))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Explore Ideas 💡</h1>
        <p className="text-base-content/60 text-lg">
          Discover innovative startup ideas from our community
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search ideas..."
            className="input input-bordered w-full pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-3 text-base-content/50">🔍</span>
        </div>
        <select
          className="select select-bordered w-full md:w-48"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm rounded-full ${
              selectedCategory === cat
                ? "btn-primary"
                : "btn-ghost border border-base-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-base-content/50 mb-6">
        {ideas.length} ideas found
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-xl text-base-content/60">No ideas found</p>
          <button
            onClick={() => { setSearch(""); setSelectedCategory("All"); }}
            className="btn btn-primary mt-4"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map(idea => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Ideas;