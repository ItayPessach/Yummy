import { useState, useRef, ChangeEvent } from "react";
import ProfileAvatarUploadModal from "./ProfileAvatarUploadModal";
import "../styles/AvatarUpload.css";
import { IconButton } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface Props {
  src?: File;
  changeProfileImage: (newProfileImage?: File) => void;
}

function ProfileAvatarInput({ src, changeProfileImage }: Props) {
  const [preview, setPreview] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [profileModalImage, setProfileModalImage] = useState(src);

  const inputRef = useRef(null);

  const setPreviewState = (blob: Blob) => {
    changeProfileImage(new File([blob], "profile-image.png"));
    setPreview(URL.createObjectURL(blob));
  };

  const setModalState = (open: boolean) => {
    setModalOpen(open);
  };
  const handleInputClick = () => {
    (inputRef.current! as any).click();
  };

  const handleImgChange = (e: ChangeEvent) => {
    setProfileModalImage((e.target as any).files[0]);
    setModalOpen(true);
  };

  const resetProfileImage = () => {
    setPreview("");
    changeProfileImage(undefined);
  };

  return (
    <>
      {preview && (
        <IconButton
          sx={{ position: "absolute", top: 130, left: 120 }}
          onClick={resetProfileImage}
        >
          <CancelOutlinedIcon />
        </IconButton>
      )}
      <div className="avatar-upload-container">
        {profileModalImage && (
          <ProfileAvatarUploadModal
            modalOpen={modalOpen}
            src={profileModalImage}
            setPreview={setPreviewState}
            setModalOpen={setModalState}
          />
        )}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImgChange}
        />
        <div className="img-container">
          <img
            src={preview || "./add-user.jpeg"}
            alt=""
            width="200"
            height="200"
            onClick={handleInputClick}
          />
        </div>
      </div>
    </>
  );
}

export default ProfileAvatarInput;
