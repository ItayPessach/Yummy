import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ProfileAvatarInput from "@/components/ProfileAvatarInput";
import { ChangeEvent, useEffect, useState } from "react";
import { useUserContext } from "@/common/context/useUserContext";
import { useNavigate } from "react-router-dom";
import usersService from "@/services/usersService";
const env = import.meta.env;

function EditProfile() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [profileImage, setProfileImage] = useState<File | string>("");
  // TODO: Need to add home city logic

  useEffect(() => {
    setEmail(user?.email ?? "");
    setFullName(user?.fullName ?? "");
    setHomeCity(user?.homeCity ?? "Tel Aviv"); // TODO: change to empty string after implementing cities api
    setProfileImage(
      user?.profileImage ? env.VITE_UPLOAD_FOLDER_PATH + user.profileImage : ""
    );
  }, [user]);

  const setStateProfileImage = (newProfileImage: File | string) => {
    setProfileImage(newProfileImage);
  };

  const editProfile = () => {
    const { request } = usersService.editProfile({
      fullName,
      email,
      homeCity,
      ...(typeof profileImage !== "string" && { picture: profileImage }),
    });

    request
      .then((res) => {
        setUser(res.data);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelEdit = () => {
    navigate("/profile");
  };

  return (
    <Stack sx={{ p: 10, alignItems: "center" }} spacing={5}>
      <ProfileAvatarInput
        changeProfileImage={setStateProfileImage}
        src={profileImage}
        width={280}
        height={280}
      />
      <TextField
        label="email"
        value={email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
        placeholder="email"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlinedIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: "25vw" }}
      />
      <TextField
        label="fullName"
        value={fullName}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setFullName(event.target.value);
        }}
        sx={{ width: "25vw" }}
        placeholder="fullName"
        variant="outlined"
        type="fullName"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        select
        label="homeCity"
        placeholder="homeCity"
        value={homeCity}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setHomeCity(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeOutlinedIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: "25vw" }}
      />
      <Box
        sx={{ display: "flex", width: "30%", justifyContent: "center", gap: 2 }}
      >
        <Button
          disableElevation
          variant="contained"
          disabled={!email && !fullName && !homeCity}
          onClick={editProfile}
          sx={{
            color: "white",
            backgroundColor: "primary.main",
            ":hover": { backgroundColor: "primary.main" },
            width: "30%",
            height: "6vh",
            mt: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Save Profile
          </Typography>
        </Button>
        <Button
          disableElevation
          variant="contained"
          onClick={cancelEdit}
          sx={{
            color: "white",
            background: "#ff9800",
            ":hover": { backgroundColor: "#ff9800" },
            width: "30%",
            height: "6vh",
            mt: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Cancel
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
}

export default EditProfile;
