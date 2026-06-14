import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = async () => {
    await logout();
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/ideas">Ideas</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-idea">Add Idea</NavLink></li>
          <li><NavLink to="/my-ideas">My Ideas</NavLink></li>
          <li><NavLink to="/my-interactions">My Interactions</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="text-xl font-bold text-primary">
          💡 IdeaVault
        </Link>
      </div>

      {/* Center - Nav Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks}
        </ul>
      </div>

      {/* Right - Theme + Auth */}
      <div className="navbar-end gap-2">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                  alt={user.displayName}
                />
              </div>
            </div>
            <ul tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li className="menu-title px-4 py-2 font-semibold">
                {user.displayName}
              </li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;