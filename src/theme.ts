import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#071032",
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
  },
});

export default theme;
