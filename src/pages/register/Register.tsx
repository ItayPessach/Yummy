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
import authService from "@/services/authService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [profileImage, setProfileImage] = useState<File>();
  const navigate = useNavigate();

  const setStateProfileImage = (newProfileImage?: File) => {
    setProfileImage(newProfileImage);
  };

  const createAccount = () => {
    const { request } = authService.register({
      email,
      password,
      fullName,
      homeCity: homeCity === "" ? "Tel Aviv" : homeCity, // TODO: delete this line when we add home city logic
      profileImage, // TODO: figure out why mimetype is always 'application/octet-stream' which does not work with multer
    });

    request
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Stack sx={{ mt: 6, alignItems: "center" }} spacing={3}>
              <ProfileAvatarInput
                changeProfileImage={setStateProfileImage}
                src={profileImage}
                width={200}
                height={200}
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
                label="fullName"
                placeholder="fullName"
                value={fullName}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setFullName(event.target.value);
                }}
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
