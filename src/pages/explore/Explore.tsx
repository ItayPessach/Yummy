import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Grid,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AntSwitch from "../../components/AntSwitch";
import Post from "./Post";
import { useUserContext } from "@/context/UserContext";

function Explore() {
  const { user } = useUserContext();
  const [myPostsChecked, setMyPostsChecked] = useState(true);
  const [selectedCity, setSelectedCity] = useState(user?.homeCity ?? "");

  return (
    <Stack sx={{ p: 4, gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Typography variant="h6" sx={{ color: "#4B5563", fontWeight: "bold" }}>
          Only My Posts
        </Typography>
        <AntSwitch
          checked={myPostsChecked}
          onChange={(event) => setMyPostsChecked(event.target.checked)}
          inputProps={{ "aria-label": "ant design" }}
          sx={{ my: "auto" }}
        />
      </Box>
      <TextField
        select
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeOutlinedIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: "20vw", height: "5vh" }}
        value={selectedCity}
        onChange={(event) => setSelectedCity(event.target.value)}
      />
      <Grid
        container
        spacing={5}
        sx={{ maxHeight: "80vh", overflowY: "auto", mt: 1 }}
      >
        <Post />
      </Grid>
    </Stack>
  );
}

export default Explore
