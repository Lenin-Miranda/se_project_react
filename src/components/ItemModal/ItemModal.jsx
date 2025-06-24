import "./ItemModal.css";
import "../ModalWithForm/ModalWithForm.css";
import closeButton from "../../assets/close-icon.svg";
import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ItemModal({ item, onClose, name, onDeleteItem, isOpen }) {
  const currentUser = useContext(CurrentUserContext);
  if (!isOpen || !item) return null;

  const isOwn = item.owner === currentUser?._id;

  function handleDeleteItem() {
    onDeleteItem(item._id);
  }

  return (
    <div className={`modal modal__type_${name} modal_opened`}>
      <div className="modal__item">
        <div className="modal__item-container">
          <div className="modal__item-container-button">
            <button
              className="modal__item-close"
              type="button"
              onClick={onClose}
            >
              <img className="modal__item-close-image" src={closeButton} />
            </button>
          </div>
          <div className="modal__item-container-image">
            <img
              className="modal__item-image"
              src={item.imageUrl}
              alt={item.name}
            />
            <div className="modal__item-container-description">
              <p className="modal__item-container-description-title">
                {item.name}
              </p>
              <p className="modal__item-container-description-title">
                Weather: {item.weather}
              </p>

              {isOwn ? (
                <button
                  onClick={handleDeleteItem}
                  className="modal__item-container-delete"
                  type="button"
                >
                  Delete Item
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
