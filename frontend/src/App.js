// frontend/src/App.js
import React, { useState } from "react";
import api from "./api"; // Import the API service
import "./App.css";  // This line links your CSS file to your component

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:5000/api/login"
      : "http://localhost:5000/api/register";

    try {
      const res = await api.post(url, form); // Use our custom api instance
      alert(res.data.message);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleProtectedRequest = async () => {
    try {
      const res = await api.get("/protected");
      setMessage(res.data.message);
    } catch (err) {
      alert("Error accessing protected route.");
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {!isLogin && (
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
      )}
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>
      <p>
        {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </span>
      </p>

      {/* Button to access protected route */}
      <button onClick={handleProtectedRequest}>Access Protected Route</button>
      <p>{message}</p>
    </div>
  );
};

export default App;
