import { Link } from "react-router-dom";
import "./register.css";

export const Register = () => {
  return (
    <div className="register">
      <span className="loginTitle">Register</span>
      <form className="loginForm">
        <label>Username</label>
        <input type="text" className="registerInput" placeholder="Enter your username..." />
        <label>Email</label>
        <input type="text" className="registerInput" placeholder="Enter your email..." />
        <label>Password</label>
        <input type="password" className="registerInput" placeholder="Enter your password..." />
        <button className="registerButton">Register</button>
        <button className="registerLoginButton">
          <Link className="link" to="/login">Login</Link>
        </button>
      </form>
    </div>
  )
}
