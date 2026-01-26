import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setUser } = useContext(StoreContext);
  const { t } = useTranslation();

  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response =
        currState === "Sign Up"
          ? await axios.post(`${url}/api/user/register`, data)
          : await axios.post(`${url}/api/user/login`, data);

      if (response.data.success) {
        toast.success(response.data.message);

        if (currState === "Login") {
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
        }

        setData({ name: "", email: "", password: "" });
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="login-popup-backdrop">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="login-popup-container">
        <div className="login-popup-header">
          <h2>
            {currState === "Sign Up"
              ? t("login.signup")
              : t("login.login")}
          </h2>

          <button className="close-btn" onClick={() => setShowLogin(false)}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-popup-form">
          <div className="inputs-container">
            {currState === "Sign Up" && (
              <input
                type="text"
                name="name"
                placeholder={t("login.yourName")}
                required
                value={data.name}
                onChange={onChangeHandler}
              />
            )}

            <input
              type="email"
              name="email"
              placeholder={t("login.email")}
              required
              value={data.email}
              onChange={onChangeHandler}
            />

            <input
              type="password"
              name="password"
              placeholder={t("login.password")}
              required
              value={data.password}
              onChange={onChangeHandler}
            />
          </div>

          <div className="bottom-section">
            <button type="submit" className="submit-btn">
              {currState === "Sign Up"
                ? t("login.signup")
                : t("login.login")}
            </button>

            <p className="toggle">
              {currState === "Sign Up" ? (
                <>
                  {t("login.alreadyAccount")}{" "}
                  <span
                    className="highlight"
                    onClick={() => setCurrState("Login")}
                  >
                    {t("login.login")}
                  </span>
                </>
              ) : (
                <>
                  {t("login.dontHaveAccount")}{" "}
                  <span
                    className="highlight"
                    onClick={() => setCurrState("Sign Up")}
                  >
                    {t("login.signup")}
                  </span>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
