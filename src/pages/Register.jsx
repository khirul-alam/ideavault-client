import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const Register = () => {
  useTitle("Register");
  const { register, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password Validation
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters!");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must include an uppercase letter!");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Password must include a lowercase letter!");
    }

    try {
      await register(email, password);
      await updateUserProfile(name, photo);
      toast.success("Registration successful! 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            Join IdeaVault! 💡
          </h2>
          <p className="text-center text-base-content/60 mb-6">
            Create your account
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="url"
                name="photo"
                placeholder="https://your-photo-url.com"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-base-content/50"
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Min 6 chars, uppercase & lowercase required
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>
          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;