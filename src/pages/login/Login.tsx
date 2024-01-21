import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import HorizontalLineWithText from "@/components/HorizontalLineWithText";
import { useAuth } from "@/common/hooks/useAuth";
import { useUserContext } from "@/common/context/useUserContext";
import authService from "@/services/authService";

function Login() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();

  const resetFields = () => {
    setUsername("");
    setPassword("");
  };
  const login = () => {
    const { request } = authService.login({
      email: username,
      password,
    });

    request
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    request.catch((err) => {
      console.log(err);
    });

    setToken(username);
    setUser({
      _id: "123",
      username: "HASOS",
      fullname: "Itay Hasson",
      email: "123@123.123",
      homeCity: "Tel Aviv",
      token: "123",
    });
    navigate("/");
    resetFields();
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
        label="username"
        value={username}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setUsername(event.target.value);
        }}
        sx={{ width: "60%", mx: "auto" }}
        placeholder="username"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlineIcon />
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
        placeholder="paswword"
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
