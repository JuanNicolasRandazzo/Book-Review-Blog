import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export const Login = () => {

const userRef = useRef();
const passwordRef = useRef();
const {  dispatch, isFetching } = useContext(Context);

const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault(e);
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/login", {
      username: userRef.current.value,
      password: passwordRef.current.value,
    });
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data})
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE" });

    if (err.response && err.response.status === 400) {
      setError(err.response.data);
    } else {
      setError("An error ocurred during login. Try again.");
      console.error("Login error: ", err);
    }
  }
};
  

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              type="text" 
              className="loginInput" 
              placeholder="Enter your username..."
              ref={userRef}
            />
            <label>Password</label>
            <input 
              type="password" 
              className="loginInput" 
              placeholder="Enter your password..."
              ref={passwordRef}
            />
            <button className="loginButton" type="submit" disabled = {isFetching}>Login</button>
            <button className="loginRegisterButton">
              <Link className="link" to="/register">Register</Link>
            </button>
            {error && <span className="loginError">{error}</span>}
        </form>
    </div>
  )
}
