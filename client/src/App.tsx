import React, { useEffect, useState } from "react";
import HowItWorks from "./component/HowitWorks/HowitWorks"; // Added HowItWorks component
import PrivacyPolicy from "./component/FAQ/Faq";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/LoginForm";
import Logout from "./Logout";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import QuestionAnswer from "./pages/QuestionAnswer/QuestionAnswer";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthenticatedApp />
      </Router>
    </AuthProvider>
  );
};

const AuthenticatedApp: React.FC = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkUser = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3000/users/check-user", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("User authentication failed");
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Authentication error:", error);
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <h3>Loading, please wait...</h3>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/question/:question_id"
        element={
          <ProtectedRoute>
            <QuestionAnswer />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/askquestion" element={<AskQuestion />} />
      <Route path="/how-it-works" element={<HowItWorks />} />{" "}
      {/* Added How It Works route */}
      <Route path="/faq" element={<PrivacyPolicy />} /> {/* Added FAQ route */}
    </Routes>
    </Routes>
  );
};

export default App;
