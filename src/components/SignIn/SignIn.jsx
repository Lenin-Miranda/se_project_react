import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SignIn.css";
import { useState } from "react";
function SignIn({ isOpen, onSignIn, onClose, onOpenSignIn, onOpenLogIn }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const isDisabled = !formData.email || !formData.password || !formData.name;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isDisabled) {
      onSignIn(formData);
    }
  }

  return (
    <ModalWithForm
      name="SignIn"
      buttonText="Sign in"
      onClose={onClose}
      isOpen={isOpen}
      title="Sign Up"
      buttonTextSecondary="Or Log In"
      onOpenSignIn={onOpenSignIn}
      onOpenLogIn={onOpenLogIn}
      isDisabled={isDisabled}
      onSubmit={handleSubmit}
    >
      <label className="modal__form-label" htmlFor="email">
        Email
        <input
          className="modal__form-input"
          type="email"
          name="email"
          id="email-signin"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        ></input>
      </label>

      <label className="modal__form-label" htmlFor="password">
        Password
        <input
          className="modal__form-input"
          type="password"
          name="password"
          id="password-signin"
          placeholder="Password"
          autoComplete="off"
          required
          value={formData.password}
          onChange={handleChange}
        ></input>
      </label>

      <label className="modal__form-label" htmlFor="name">
        Name
        <input
          className="modal__form-input"
          type="text"
          name="name"
          id="name-signin"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        ></input>
      </label>

      <label className="modal__form-label" htmlFor="avatar">
        Avatar URL
        <input
          className="modal__form-input"
          type="url"
          name="avatar"
          id="avatar-signin"
          placeholder="Avatar URL"
          value={formData.avatar}
          onChange={handleChange}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default SignIn;
