import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registering with:", { username, email, password });
  
    try {
      const response = await axios.post("http://localhost:5001/api/users/register", {
        username,
        email,
        password,
      });
  
      console.log("✅ Server response:", response.data); // ✅ Move here
  
      localStorage.setItem("token", response.data.token);
      alert("Registration successful!");
      navigate("/chat");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="text-center mb-3">Register</h3>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
