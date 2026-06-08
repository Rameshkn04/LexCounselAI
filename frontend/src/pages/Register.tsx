import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const register =
    async () => {

      try {

        await API.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

        alert(
          "Registration Successful"
        );

        navigate("/");

      } catch (error: any) {
          console.log(error);
          console.log(error?.response);
          console.log(error?.response?.data);

          alert(
            error?.response?.data?.detail ||
            JSON.stringify(error?.response?.data) ||
            error?.message ||
            "Registration Failed"
          );
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
            Create your account
          </p>

        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <input
          type="email"
          placeholder="Email"
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

        <button
          onClick={register}
        >
          Register
        </button>

        <p>

          Already have an account?

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Register;