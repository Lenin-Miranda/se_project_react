import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

function ProfileData({ onClose, isOpen, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Actualizar los inputs cuando cambie el usuario o se abra el modal
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Change Profile Data"
      name="profile-data"
      buttonText="Save changes"
      onSubmit={handleSubmit}
    >
      <div className="profile__modal">
        <label className="modal__form-label">
          Name*
          <input
            className="modal__form-input"
            placeholder="Enter a name"
            value={name}
            onChange={handleNameChange}
            required
          ></input>
        </label>
        <label className="modal__form-label">
          Avatar*
          <input
            className="modal__form-input"
            placeholder="Enter a url"
            value={avatar}
            onChange={handleAvatarChange}
            required
          ></input>
        </label>
      </div>
    </ModalWithForm>
  );
}

export default ProfileData;
