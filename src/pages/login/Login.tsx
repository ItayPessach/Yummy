import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import HorizontalLineWithText from "@/components/HorizontalLineWithText";
import { useUserContext } from "@/common/context/useUserContext";
import authService from "@/services/authService";
import usersService from "@/services/usersService";

function Login() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };
  const login = () => {
    const { request } = authService.login({
      email,
      password,
    });

    request
      .then((res) => {
        document.cookie = `access_token=${res.data.accessToken}; path=/`;
        document.cookie = `refresh_token=${res.data.refreshToken}; path=/`;

        const { request } = usersService.getMe();

        request
          .then((res) => {
            setUser(res.data);
            navigate("/");
            resetFields();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const register = () => {
    navigate("/register");
    resetFields();
  };

  return (
    <Stack
      sx={{
        p: 10,
        textAlign: "center",
        width: "60%",
        mx: "auto",
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 5 }}>
        Welcome To Yummy Food Community
      </Typography>
      <TextField
        label="email"
        value={email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
        sx={{ width: "60%", mx: "auto" }}
        placeholder="email"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="password"
        value={password}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}
        sx={{ width: "60%", mx: "auto" }}
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
      <Button
        variant="contained"
        onClick={login}
        sx={{
          color: "white",
          backgroundColor: "primary.main",
          ":hover": { backgroundColor: "primary.main" },
          width: "25vw",
          height: "6vh",
          mt: 3,
          mx: "auto",
        }}
      >
        Login
      </Button>
      <HorizontalLineWithText text="OR" />
      <Button
        variant="contained"
        sx={{
          color: "black",
          backgroundColor: "white",
          ":hover": { backgroundColor: "white" },
          width: "25vw",
          height: "6vh",
          mx: "auto",
        }}
        startIcon={<GoogleIcon />}
      >
        Sign in with google
      </Button>
      <Button
        variant="contained"
        onClick={register}
        sx={{
          color: "white",
          backgroundColor: "black",
          ":hover": { backgroundColor: "black" },
          width: "25vw",
          height: "6vh",
          mx: "auto",
        }}
      >
        New to this website? Join Now
      </Button>
    </Stack>
  );
}

export default Login;
