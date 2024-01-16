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
import { useUserContext } from "@/context/useUserContext";

function EditProfile() {
  const { user } = useUserContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // TODO: decide if we want to allow users to change their password
  const [profileImage, setProfileImage] = useState<File | undefined>();
  // TODO: Need to add home city logic

  useEffect(() => {
    setUsername(user?.username ?? "");
    setPassword("password");
    if (user?.profilePicture) {
      setProfileImage(
        new File([user.profilePicture], "profile-picture", {
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
    console.log(username, password, profileImage);
  };

  const cancelEdit = () => {
    setUsername(user?.username ?? "");
    setPassword("password");
    if (user?.profilePicture) {
      setProfileImage(
        new File([user.profilePicture], "profile-picture", {
          type: "image/png",
        })
      );
    }
  };

  return (
    <Stack sx={{ p: 12, alignItems: "center" }} spacing={5}>
      <ProfileAvatarInput
        changeProfileImage={setStateProfileImage}
        src={profileImage}
        width={280}
        height={280}
      />
      <TextField
        label="username"
        value={username}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setUsername(event.target.value);
        }}
        placeholder="username"
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
          disabled={!username && !password && !profileImage}
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
