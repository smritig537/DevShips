import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });

      console.log("Login success:");   
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>

          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs py-2"
              value={email}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs my-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="card-actions justify-center">
            <button className="btn btn-purple-300" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
