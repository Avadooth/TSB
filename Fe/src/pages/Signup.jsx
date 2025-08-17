import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../Style/SignIn.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("Form data:", form);
    e.preventDefault();
    try {
      const response = await API.post("/auth/signup", form);
      setShowModal(true);
    } catch {
      alert("Signup failed");
    }
  };
  const handleModalOk = () => {
    setShowModal(false);
    navigate("/"); // redirect to login after OK
  };
  return (
    <>
      <div className="signin-container">
        <div className="signin-viewport">
          <div className="signin-wrapper">
            <div className="signin-card">
              <h1 className="signin-title">Sign in</h1>

              <form onSubmit={handleSubmit} className="signin-form" noValidate>
                {/* Name */}
                <div className="form-field">
                  <label htmlFor="name" className="form-label">
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                    autoComplete="name"
                  />
                </div>
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



                {/* Submit */}
                <div className="form-field submit-field">
                  <button type="submit" className="submit-btn">
                    Sign in
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content medium">
            <h2>User created successfully 🎉</h2>
            <p>You can now log in with your account.</p>
            <button onClick={handleModalOk} className="modal-ok-btn">
              OK
            </button>
          </div>
        </div>
      )}

    </>
  );
}
