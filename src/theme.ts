import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00C2E8",
    },
    secondary: {
      main: "#4B5563",
    },
    background: {
      default: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: "Outfit",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
