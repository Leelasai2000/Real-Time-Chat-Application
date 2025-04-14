import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="mb-4">Welcome to Real-Time Chat App</h2>

      <div className="mb-3">
        <button
          className={`btn me-2 ${showLogin ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          className={`btn ${!showLogin ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowLogin(false)}
        >
          Register
        </button>
      </div>

      <div style={{ width: "100%", maxWidth: "500px" }}>
        {showLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Home;
