import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await login(email, password);
      toast.success("Login successful! 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Login successful! 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            Welcome Back! 👋
          </h2>
          <p className="text-center text-base-content/60 mb-6">
            Login to IdeaVault
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
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
                <span className="label-text-alt text-primary cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login */}
          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;