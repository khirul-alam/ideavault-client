import { Link } from "react-router-dom";

const IdeaCard = ({ idea }) => {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full">
      {/* Image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={idea.imageURL || "https://placehold.co/400x200?text=IdeaVault"}
          alt={idea.title}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="badge badge-primary">{idea.category}</span>
          <span className="text-xs text-base-content/50">
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Title */}
        <h3 className="card-title text-lg leading-tight">{idea.title}</h3>

        {/* Short Description */}
        <p className="text-base-content/60 text-sm line-clamp-2">
          {idea.shortDescription}
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 mt-2">
          <div className="avatar">
            <div className="w-6 rounded-full">
              <img
                src={idea.authorPhoto || "https://i.ibb.co/5GzXkwq/user.png"}
                alt={idea.authorName}
              />
            </div>
          </div>
          <span className="text-xs text-base-content/60">{idea.authorName}</span>
        </div>

        {/* Button */}
        <div className="card-actions mt-4">
          <Link
            to={`/ideas/${idea._id}`}
            className="btn btn-primary btn-sm w-full"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;