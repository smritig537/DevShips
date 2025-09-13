import React from "react";
import "../App.css";

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 shadow-sm w-screen px-4">
      {/* Left section */}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">💻🚀 Devships</a>
      </div>

      {/* Right section */}
      <div className="flex gap-2">
        {/* Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User Avatar"
              />
            </div>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
