import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("404 - Not Found");
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-3xl font-bold mt-4 mb-2">Page Not Found!</p>
        <p className="text-base-content/60 mb-8">
          The page you are looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;