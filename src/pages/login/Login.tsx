import { useNavigate } from 'react-router-dom'
import { useState, ChangeEvent } from "react"
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import HorizontalLineWithText from "@/components/HorizontalLineWithText";

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const resetFields = () => {
    setName('')
    setPassword('')
  }
  const login = () => {
    console.log(name, password);
    navigate('/explore');
    resetFields()

  }

  return (
    <Box
      sx={{
        p: 10,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        width: '60%',
        mx: 'auto',
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 5 }}>
        Welcome To Yummy Food Community
      </Typography>
      <TextField label="username" value={name} onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)}} sx={{ width: '60%', mx: 'auto'}} placeholder='username' variant="outlined" InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <PersonOutlineIcon />
          </InputAdornment>
        ),
      }} />
      <TextField label="password" value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)}} sx={{ width: '60%', mx: 'auto'}} placeholder='paswword' variant="outlined" type='password' InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockOutlinedIcon />
          </InputAdornment>
        ),
      }} />
      <Button
        variant='contained'
        onClick={login}
        sx={{
          color: "white",
          backgroundColor: "primary.main",
          ":hover": {backgroundColor: 'primary.main'},
          width: "25vw",
          height: "6vh",
          mt: 3,
          mx: "auto",
        }}
      >
        login
      </Button>
      <HorizontalLineWithText text="OR" />
      <Button
        variant='contained'
        sx={{
          color: "black",
          backgroundColor: "white",
          ":hover": {backgroundColor: 'white'},
          width: "25vw",
          height: "6vh",
          mx: "auto",
        }}
        startIcon={<GoogleIcon />}
      >
        sign in with google
      </Button>
      <Button
        variant='contained'
        sx={{
          color: "white",
          backgroundColor: "black",
          ":hover": {backgroundColor: 'black'},
          width: "25vw",
          height: "6vh",
          mx: "auto",
        }}
      >
        new to this website? join Now
      </Button>
    </Box>
  );
}

export default Login;
