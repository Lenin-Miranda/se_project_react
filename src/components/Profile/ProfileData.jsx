import ModalWithForm from "../ModalWithForm/ModalWithForm";

function ProfileData({ onClose, isOpen }) {
  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Change Profile Data"
      name="profile-data"
      buttonText="Save changes"
    >
      <div className="profile__modal">
        <label className="modal__form-label">
          Name*
          <input
            className="modal__form-input"
            placeholder="Enter a name"
          ></input>
        </label>
        <label className="modal__form-label">
          Avatar*
          <input
            className="modal__form-input"
            placeholder="Enter a url"
          ></input>
        </label>
      </div>
    </ModalWithForm>
  );
}

export default ProfileData;
