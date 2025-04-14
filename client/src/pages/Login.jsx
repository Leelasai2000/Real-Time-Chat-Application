import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  
    try {
      const response = await axios.post("http://localhost:5001/api/users/login", {
        email,
        password,
      });
  
      console.log("✅ Server response:", response.data); // ✅ Now it's safe to log
  
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/chat");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="text-center mb-3">Login</h3>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
