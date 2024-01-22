import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ProfileAvatarInput from "@/components/ProfileAvatarInput";
import { ChangeEvent, useEffect, useState } from "react";
import { useUserContext } from "@/common/context/useUserContext";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // TODO: decide if we want to allow users to change their password
  const [profileImage, setProfileImage] = useState<File | undefined>();
  // TODO: Need to add home city logic

  useEffect(() => {
    setEmail(user?.email ?? "");
    setPassword("password");
    if (user?.profileImage) {
      setProfileImage(
        new File([user.profileImage], "profile-picture", {
          type: "image/png",
        })
      );
    }
  }, [user]);

  const setStateProfileImage = (newProfileImage?: File) => {
    setProfileImage(newProfileImage);
  };

  const editProfile = () => {
    // TODO: edit profile in the database and return the updated user to the context
    console.log(email, password, profileImage);
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
              <PersonOutlineIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: "25vw" }}
      />
      <TextField
        label="password"
        value={password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}
        sx={{ width: "25vw" }}
        placeholder="password"
        variant="outlined"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        select
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
          disabled={!email && !password && !profileImage}
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
