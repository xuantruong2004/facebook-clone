import React from "react";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { AiOutlineClose } from "react-icons/ai";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";

import PostPic1 from "../../img/defaultProfile.jpg";
import "./Share.scss";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../actions/UploadAction";
import { useNavigate } from "react-router-dom";
import { postActions } from "../../redux/slice/postSlice";

const Share = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const uploading = useSelector((state) => state.post.uploading);

  const { user } = useSelector((state) => state.auth.authData);

  const navigate = useNavigate();
  const GotoProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleShare = async (e) => {
    e.preventDefault();
    if (desc.current.value !== "" || image) {
      await dispatch(postActions.UPLOAD_START());
    }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const storageRef = ref(storage, `Images/${Date.now()}-${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

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
            newPost.image = downloadURL;
            dispatch(uploadPost(newPost));
          });
        }
      );
    } else {
      if (newPost.desc !== "") {
        dispatch(uploadPost(newPost));
      }
    }

    reset();
  };

  return (
    <div className="ShareContainer">
      <img
        src={user?.profileImage ? user?.profileImage : PostPic1}
        alt=""
        className="imageUser"
        onClick={GotoProfile}
      />
      <div className="ShareContent">
        <div className="input">
          <input
            type="text"
            placeholder="What's happening with you"
            ref={desc}
            required
          />
        </div>
        <div className="BoxIcon">
          <div
            className="IconItem"
            style={{ color: "green" }}
            onClick={() => imageRef.current.click()}
          >
            <AddAPhotoOutlinedIcon className="Icon" />
            <span>Photo</span>
          </div>
          <div className="IconItem" style={{ color: "purple" }}>
            <OndemandVideoOutlinedIcon className="Icon" />
            <span>Video</span>
          </div>
          <div className="IconItem" style={{ color: "red" }}>
            <AddLocationAltOutlinedIcon className="Icon" />
            <span>Location</span>
          </div>
          <div className="IconItem">
            <CalendarMonthOutlinedIcon className="Icon" />
            <span>Schedule</span>
          </div>
          <button
            className="btnShare"
            disabled={uploading}
            onClick={handleShare}
          >
            {uploading ? "loading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="imageShare">
            <img src={URL.createObjectURL(image)} alt="imageShare" />
            <AiOutlineClose
              className="iconClose"
              onClick={() => setImage(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Share;
