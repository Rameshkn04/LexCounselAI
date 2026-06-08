import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [rememberMe,
    setRememberMe] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const login = async () => {

    try {

      setLoading(true);

      const response =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

        if (rememberMe) {

        localStorage.setItem(
        "token",
        response.data.access_token
        );

        localStorage.setItem(
            "userEmail",
            email
        );

        } else {

        sessionStorage.setItem(
            "token",
            response.data.access_token
        );

        sessionStorage.setItem(
            "userEmail",
            email
        );

    }

      navigate("/dashboard");

    } catch (error: any) {

      alert(
        error?.response?.data?.detail
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-page">

      <div className="overlay"></div>

      <div className="auth-card">

        <div className="brand">

          <h1>
            ⚖️ LexCounsel AI
          </h1>

          <p>
            AI-Powered Legal
            Document Assistant
          </p>

        </div>

        <h2>
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <div className="remember-row">

          <label>

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }
            />

            Remember Me

          </label>

          <a href="#">
            Forgot Password?
          </a>

        </div>

        <button
          onClick={login}
        >
          {loading
            ? "Signing In..."
            : "Login"}
        </button>

        <p>

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Login;