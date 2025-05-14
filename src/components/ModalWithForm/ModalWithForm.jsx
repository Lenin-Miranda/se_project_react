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

/*<label className="modal__form-label" htmlFor="name">
              {name}
              <input
                className="modal__form-input"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </label>
            <label className="modal__form-label" htmlFor="image">
              Image
              <input
                className="modal__form-input"
                type="url"
                name="image"
                placeholder="Image URL"
                required
              />
            </label>
            <p className="modal__form-text">Select the weather type</p>
            <div className="modal__form-container-selection">
              <label className="modal__form-label-selection" htmlFor="hot">
                <input
                  className="modal__form-input  modal__form-input-type-radio"
                  type="radio"
                  name="weather"
                  value="hot"
                />
                <span className="modal__form-radius"></span>
                {"  Hot "}
              </label>
              <label className="modal__form-label-selection" htmlFor="warm">
                <input
                  className="modal__form-input  modal__form-input-type-radio"
                  type="radio"
                  name="weather"
                  value="warm"
                />
                <span className="modal__form-radius"></span>
                {" Warm"}
              </label>
              <label className="modal__form-label-selection" htmlFor="hot">
                <input
                  className="modal__form-input modal__form-input-type-radio"
                  type="radio"
                  name="weather"
                  value="cold"
                />
                <span className="modal__form-radius"></span>
                {" Cold"}
              </label>
             
            </div>*/
