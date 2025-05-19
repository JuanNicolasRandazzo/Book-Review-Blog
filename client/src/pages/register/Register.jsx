import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("/auth/register", {
        username,
        email,
        password
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError(err.response.data);
      } else {
        setError("An error occurred during registration. Try later.");
        console.error("Registration error:", err);
      }
    }
    
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          type="text" 
          className="registerInput" 
          placeholder="Enter your username..." 
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input 
          type="text" 
          className="registerInput" 
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input 
          type="password" 
          className="registerInput" 
          placeholder="Enter your password..." 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">Register</button>
        <button className="registerLoginButton">
          <Link className="link" to="/login">Login</Link>
        </button>
        {error && <span className="registerError">{error}</span>}
      </form>
    </div>
  )
}
