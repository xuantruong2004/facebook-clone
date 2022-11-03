import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";
import { updateUser } from "../../actions/UserAction";

import "./ProfileModal.scss";

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.auth.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let UserData = formData;
    const fetchImage = async () => {
      if (profileImage) {
        const storageRef = ref(
          storage,
          `Images/${Date.now()}-${profileImage.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, profileImage);

        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              UserData.profileImage = downloadURL;
            });
          }
        );
      }
      if (coverImage) {
        const storageRef = ref(
          storage,
          `Images/${Date.now()}-${coverImage.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, coverImage);

        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const uploadProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              UserData.coverImage = downloadURL;
            });
          }
        );
      }
    };

    await fetchImage();
    setTimeout(() => {
      dispatch(updateUser(param.id, UserData));
    }, 2000);
    setModalOpened(false);
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="First Name"
            name="firstname"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            placeholder="Last Name"
            name="lastname"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Works at"
            name="worksAt"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Live in"
            name="livesin"
            onChange={handleChange}
            value={formData.livesin}
          />
          <input
            type="text"
            className="infoInput"
            placeholder="Country"
            name="country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>
        <div>
          Profile Image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>
        <button className="infoButton" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </Modal>
  );
}
export default ProfileModal;
