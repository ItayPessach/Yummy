import { useNavigate } from "react-router-dom";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import HorizontalLineWithText from "@/components/HorizontalLineWithText";
import authService from "@/services/authService";
import usersService from "@/services/usersService";
import GoogleAuth from "@/components/GoogleAuth";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface LoginFormInput {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("email is required"),
  password: yup.string().required("password is requird"),
});

function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInput>({
    values: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const register = () => {
    navigate("/register");
  };

  const login: SubmitHandler<LoginFormInput> = async (data) => {
    const { request: loginRequest } = authService.login(data);

    try {
      const res = await loginRequest;
      document.cookie = `access_token=${res.data.accessToken}; path=/`;
      document.cookie = `refresh_token=${res.data.refreshToken}; path=/`;

      const { request: getMeRequest } = usersService.getMe();

      await getMeRequest;
      navigate("/");
    } catch (err: any) {
      if (err.response.status === 401) {
        setServerError('some of the details are incorrect');
      }
    }
  };

  return (
    <Stack
      sx={{
        p: 10,
        textAlign: "center",
        width: "60%",
        mx: "auto",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Typography variant="h2" sx={{fontWeight: "bold", mb: 5}}>
        Welcome To Yummy Food Community
      </Typography>
      <form onSubmit={handleSubmit(login)} style={{ width: '80%' }}>
        <Stack spacing={4} alignItems='center'>
          <Controller
            name="email"
            control={control}
            render={({field}) =>
              <TextField
                {...field}
                error={!!errors.email}
                fullWidth
                label="email"
                sx={{width: "60%", mx: "auto"}}
                placeholder="email"
                helperText={errors.email?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />}
          />
          <Controller
            name="password"
            control={control}
            render={({field}) =>
              <TextField
                {...field}
                error={!!errors.password}
                fullWidth
                label="password"
                sx={{width: "60%", mx: "auto"}}
                placeholder="password"
                type="password"
                helperText={errors.password?.message}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />}
          />
          <Button
            variant="contained"
            type='submit'
            sx={{
              color: "white",
              backgroundColor: "primary.main",
              ":hover": {backgroundColor: "primary.main"},
              width: "25vw",
              height: "6vh",
              mt: 3,
              mx: "auto",
            }}
          >
            Login
          </Button>
          {serverError && <Typography variant="caption" color='error'>{ serverError }</Typography>}
        </Stack>
      </form>
      <HorizontalLineWithText text="OR"/>
      <GoogleAuth/>
      <Button
        variant="contained"
        onClick={register}
        sx={{
          color: "white",
          backgroundColor: "black",
          ":hover": {backgroundColor: "black"},
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
