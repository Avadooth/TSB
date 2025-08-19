import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../Style/LoginIn.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      if (res.data.success) {
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="signin-container">
        <div className="signin-viewport">
          <div className="signin-wrapper">
            <div className="signin-card">
              <h1 className="signin-title">Login in</h1>

              <form onSubmit={handleSubmit} className="signin-form" noValidate>
                {/* Email */}
                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Your email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                    autoComplete="email"
                  />
                </div>

                {/* Password */}
                <div className="form-field">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="form-input"
                    autoComplete="current-password"
                  />
                </div>

                {/* Remember & Forgot */}
                <div className="form-row">
                  <label className="remember">
                    <input
                      type="checkbox"
                      className="remember-checkbox"
                      aria-label="Remember me"
                    />
                    <span className="remember-text">Remember me</span>
                  </label>

                  <a className="forgot-link" href="#">
                    Forgot your password?
                  </a>
                </div>

                {/* Submit */}
                <div className="form-field submit-field">
                  <button type="submit" className="submit-btn">
                    Login in
                  </button>
                </div>

                {/* Sign up */}
                <p className="signup-note">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="signup-link">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
