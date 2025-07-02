import "./LogInModal.css";
import "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function LogIn({ isOpen, onLogin, onClose, onOpenSignIn, onOpenLogIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData({ email: "", password: "" });
    }
  }, [isOpen]);

  const isDisabled = !formData.email || !formData.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM SUBMIT DATA:", formData);
    if (!isDisabled) {
      onLogin(formData);
    }
  };

  return (
    <ModalWithForm
      title="Login"
      name="Login"
      buttonText="Log in"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonTextSecondary="Or sign up"
      onOpenSignIn={onOpenSignIn}
      onOpenLogIn={onOpenLogIn}
      isDisabled={isDisabled}
    >
      <label className="modal__form-label" htmlFor="email">
        Email
        <input
          className="modal__form-input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        ></input>
      </label>

      <label className="modal__form-label" htmlFor="password">
        Password
        <input
          autoComplete="off"
          className="modal__form-input"
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default LogIn;
