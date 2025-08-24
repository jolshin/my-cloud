import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Share from "./pages/Share";
import ProtectedRoute from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import { Provider } from "react-redux";
import { store } from "./state/store";
import "./styles/App.css";
import "./styles/Loading.css";


function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/share/:id" element={<Share />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
