import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg";
function ModalWithForm({ title, name, buttonText, onClose, children }) {
  function handleClickOverlay(e) {
    if (e.target.classList.contains("modal")) {
      onClose;
    }
  }

  return (
    <>
      <div
        className={`modal modal_type_${name} modal_opened`}
        onClick={handleClickOverlay}
      >
        <form className="modal__form" name={name} noValidate>
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
            <button className="modal__form-button" type="submit">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalWithForm;
