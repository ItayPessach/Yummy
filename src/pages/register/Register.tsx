import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Button,
  Box,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ProfileAvatarInput from "@/components/ProfileAvatarInput";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File>();
  const navigate = useNavigate();

  const setStateProfileImage = (newProfileImage?: File) => {
    setProfileImage(newProfileImage);
  };

  const createAccount = () => {
    console.log(profileImage);
  };

  const signIn = () => {
    navigate("/login");
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          position: "absolute",
          left: 50,
          top: 10,
          zIndex: "50",
        }}
      >
        Yummy
      </Typography>
      <Typography
        variant="h4"
        sx={{
          width: "40vw",
          fontWeight: "bold",
          position: "absolute",
          left: 50,
          bottom: 300,
          zIndex: "50",
        }}
      >
        Yummy is the best place to share food experiences with fellow food
        lovers.
      </Typography>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          md={7}
          sx={{
            backgroundImage: "url(./enjoy-food.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.8",
          }}
        />
        <Grid item md={5} sx={{ p: "100px" }}>
          <Stack sx={{ position: "relative" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Create an account
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "secondary.main" }}>
              Let’s get started
            </Typography>
            <Stack sx={{ mt: 6, alignItems: "center" }} spacing={4}>
              <ProfileAvatarInput
                changeProfileImage={setStateProfileImage}
                src={profileImage}
                width={200}
                height={200}
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
                sx={{ width: "30vw" }}
              />
              <TextField
                label="password"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
                sx={{ width: "30vw" }}
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
                sx={{ width: "30vw" }}
              />
            </Stack>
            <Button
              variant="contained"
              type="submit"
              disableElevation
              sx={{
                color: "white",
                backgroundColor: "primary.main",
                ":hover": { backgroundColor: "primary.main" },
                width: "60%",
                height: "6vh",
                mt: 10,
                mx: "auto",
              }}
              onClick={createAccount}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                Create Account
              </Typography>
            </Button>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ color: "secondary.main" }}>
              Already have an account?
            </Typography>
            <Button onClick={signIn}>
              <Typography
                variant="subtitle1"
                sx={{ color: "primary.main", ml: 1 }}
              >
                Sign in
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Register;
