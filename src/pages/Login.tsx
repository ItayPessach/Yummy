import { Box, Typography, Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import TextInput from "../components/TextInput";
import HorizontalLineWithText from "../components/HorizontalLineWithText";

const Login = () => {
  return (
    <Box
      sx={{
        p: 10,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 5,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 5 }}>
        Welcome To Yummy Food Community
      </Typography>
      <TextInput placeholder="username" Icon={PersonOutlineIcon} />
      <TextInput placeholder="password" Icon={LockOutlinedIcon} />
      <Button
        sx={{
          color: "white",
          backgroundColor: "#00C2E8",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          width: "23vw",
          height: "6vh",
          mt: 3,
          mx: "auto",
        }}
      >
        login
      </Button>
      <HorizontalLineWithText text="OR" />
      <Button
        sx={{
          color: "black",
          backgroundColor: "white",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          width: "23vw",
          height: "6vh",
          mx: "auto",
        }}
        startIcon={<GoogleIcon />}
      >
        sign in with google
      </Button>
      <Button
        sx={{
          color: "white",
          backgroundColor: "black",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          width: "23vw",
          height: "6vh",
          mx: "auto",
        }}
      >
        new to this website? join Now
      </Button>
    </Box>
  );
};

export default Login;
