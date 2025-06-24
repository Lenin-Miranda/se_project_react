import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg";
import { useEffect, useState } from "react";
function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  children,
  isOpen,
  onSubmit,
  buttonTextSecondary,
  onOpenSignIn,
  onOpenLogIn,
  isDisabled = false,
}) {
  function handleClickOverlay(e) {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  }

  function handleClickSecondaryButton() {
    if (buttonTextSecondary === "Or sign up") {
      onOpenSignIn();
    } else {
      onOpenLogIn();
    }
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleClickOverlay}
    >
      <form className="modal__form" name={name} onSubmit={onSubmit} noValidate>
        <div className="modal__form-container">
          <div className="modal__form-container-image">
            <p className="modal__form-title">{title}</p>
            <button
              className="modal__form-close"
              type="button"
              onClick={onClose}
            >
              <img className="modal__form-close-image" src={closeIcon} />
            </button>
          </div>
          {children}
          <div className="modal__form-button-container">
            <button
              className="modal__form-button"
              type="submit"
              disabled={isDisabled}
              style={{
                backgroundColor: isDisabled ? "#ccc" : "#000",
                color: "#fff",
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              {buttonText}
            </button>
            {buttonTextSecondary && (
              <button
                className="modal__form-button modal__form-button-secondary"
                type="button"
                onClick={handleClickSecondaryButton}
              >
                {buttonTextSecondary}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModalWithForm;
