import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {
  Autocomplete,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormInput } from "@/common/types";
import authService from "@/services/authService.ts";
import ProfileAvatarInput from "@/components/ProfileAvatarInput.tsx";
import { observer } from "mobx-react-lite";
import citiesStore from "@/common/store/cities.store.ts";

const schema = yup.object({
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email must be a valid email")
    .required("email is required"),
  password: yup.string().required("password is requird"),
  fullName: yup.string().required("fullName is required"),
  homeCity: yup.string().optional(),
});

const RegisterForm = observer(() => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [profileImage, setProfileImage] = useState<File | undefined>();
  const { cities, fetchCities } = citiesStore;

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    values: {
      email: "",
      password: "",
      fullName: "",
      homeCity: "",
    },
    resolver: yupResolver(schema),
  });

  const createAccount: SubmitHandler<RegisterFormInput> = async (data) => {
    const { request: register } = authService.register({
      ...data,
      picture: profileImage,
    });

    try {
      await register;
      navigate("/login");
    } catch (err: any) {
      if (err.response.status === 409) {
        setServerError(err.response.data);
      }

      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(createAccount)}>
      <Stack spacing={4} alignItems="center">
        <ProfileAvatarInput
          changeProfileImage={setProfileImage}
          profileImage={profileImage}
          width={200}
          height={200}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.email}
              fullWidth
              label="email"
              sx={{ width: "30vw" }}
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
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.password}
              fullWidth
              label="password"
              sx={{ width: "30vw" }}
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
            />
          )}
        />
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.fullName}
              fullWidth
              label="fullName"
              sx={{ width: "30vw" }}
              placeholder="email"
              helperText={errors.fullName?.message}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name="homeCity"
          control={control}
          render={({ field, formState: { errors } }) => (
            <Autocomplete
              style={{ marginBottom: 10, width: "30vw" }}
              {...field}
              options={cities}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="city"
                  error={!!errors.homeCity}
                  helperText={errors.homeCity?.message}
                  placeholder="city"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              sx={{
                "& .MuiOutlinedInput-root": {
                  pl: 1.75,
                  pt: 1,
                  pb: 1,
                },
                "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                  pl: 0,
                },
              }}
              onChange={(_, data) => field.onChange(data)}
            />
          )}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            color: "white",
            backgroundColor: "primary.main",
            ":hover": { backgroundColor: "primary.main" },
            width: "60%",
            height: "6vh",
            mt: 10,
            mx: "auto",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            Create Account
          </Typography>
        </Button>
        {serverError && (
          <Typography variant="body1" color="error" fontWeight="bold">
            {serverError}
          </Typography>
        )}
      </Stack>
    </form>
  );
});

export default RegisterForm;
