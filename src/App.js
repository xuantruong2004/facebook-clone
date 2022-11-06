import "./App.scss";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
import Message from "./pages/Message/Message";

function App() {
  const user = useSelector((state) => state.auth.authData);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />

        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />

        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/message/:id"
          element={user ? <Message /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
