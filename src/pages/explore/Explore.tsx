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

function Explore() {
  const [myPostsChecked, setMyPostsChecked] = useState(true);
  const [selectedCity, setSelectedCity] = useState(""); // TODO: set user's home city as default

  return (
    <Stack sx={{ p: 2, gap: 2 }}>
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
      <Grid container spacing={3}>
        <Post />
      </Grid>
    </Stack>
  );
}

export default Explore
