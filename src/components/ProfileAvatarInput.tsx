import { useState, useRef, ChangeEvent } from "react";
import ProfileAvatarUploadModal from "./ProfileAvatarUploadModal";
import "../styles/AvatarUpload.css";
import { Box, IconButton } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import defaultUserImage from "@/assets/defaultUserImage.png";

interface Props {
  src: File | string;
  changeProfileImage: (newProfileImage: File | string) => void;
  width: number;
  height: number;
}

function ProfileAvatarInput({ src, changeProfileImage, width, height }: Props) {
  const [preview, setPreview] = useState(defaultUserImage);
  const [modalOpen, setModalOpen] = useState(false);
  const [profileModalImage, setProfileModalImage] = useState(src);

  const inputRef = useRef(null);

  const setPreviewState = (blob: Blob) => {
    changeProfileImage(profileModalImage);
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
    changeProfileImage(defaultUserImage);
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        width: width,
        height: height,
      }}
    >
      {preview && (
        <IconButton
          sx={{ position: "absolute", top: 0, left: 0 }}
          onClick={resetProfileImage}
        >
          <CancelOutlinedIcon />
        </IconButton>
      )}
      <Box className="avatar-upload-container" sx={{ mx: "auto" }}>
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
        <Box className="img-container">
          <img
            src={preview}
            alt=""
            width={width}
            height={height}
            onClick={handleInputClick}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileAvatarInput;
