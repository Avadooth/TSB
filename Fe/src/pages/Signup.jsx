import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "../Style/SignIn.css";
import { useForm } from "react-hook-form";

export default function Signup() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onsubmit = async (data) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/signup", data);
      setShowModal(true);
      reset();
    } catch (e) {
      console.error("Signup error:", e);
      alert("Signup failed", e.message);
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

              <form
                onSubmit={handleFormSubmit(onsubmit)}
                className="signin-form"
                noValidate
              >
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
                   
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    // onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="field-error text-red-600">
                      {errors.name.message}
                    </p>
                  )}
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
                    
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    // onChange={(e) =>
                    //   setForm({ ...form, email: e.target.value })
                    // }
                    className="form-input"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="field-error text-red-600">
                      {errors.email.message}
                    </p>
                  )}
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
                  
                    // onChange={(e) =>
                    //   setForm({ ...form, password: e.target.value })
                    // }
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="form-input"
                    autoComplete="current-password"
                  />
                  {errors.password && (
                    <p className="field-error text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="form-field submit-field">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing up..." : "Sign up"}
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
