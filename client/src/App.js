import { Home } from "./pages/home/Home";
import { TopBar } from "./components/topbar/TopBar";
import { Single } from "./pages/single/Single";
import { Write } from "./pages/write/Write";
import { Settings } from "./pages/settings/Settings";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Author } from "./pages/author/Author";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import { VerificationSuccess } from "./pages/verification/VerificationSuccess";
import { VerificationFailure } from "./pages/verification/VerificationFailure";



function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/authors/:authorId" element={<Author />} />
        <Route path="/verify-email/:token" element={<p>Verifying...</p>} />
        <Route path="/verification-success" element={<VerificationSuccess />} />
        <Route path="/verification-failure" element={<VerificationFailure />} />
      </Routes>
    </Router>
  );
}

export default App;
