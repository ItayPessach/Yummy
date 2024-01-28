import {
  Stack,
  Typography,
  Paper,
  styled,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Box,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import postsService from "@/services/postsService";
import SelectCity from "@/components/SelectCity";
import { config } from "@/config";

const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
function UploadPost() {
  const [postImage, setPostImage] = useState<File>();
  const [restaurant, setRestaurant] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const changeProfileImage = (e: ChangeEvent) => {
    setPostImage((e.target as any).files[0]);
  };

  const resetPostImage = () => {
    setPostImage(undefined);
  };

  const uploadPost = () => {
    const { request } = postsService.uploadPost({
      picture: postImage!,
      restaurant,
      city,
      description,
    });

    request
      .then((res) => {
        console.log(res);
        clearFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearFields = () => {
    setPostImage(undefined);
    setRestaurant("");
    setCity("");
    setDescription("");
  };

  return (
    <Stack sx={{ alignItems: "center", mt: 5, gap: 2, height: "100vh" }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", mb: 5, color: "secondary.main" }}
      >
        Upload Your New Food Experience Here
      </Typography>
      {postImage ? (
        <div style={{ position: "relative" }}>
          <img
            src={URL.createObjectURL(postImage)}
            width={200}
            height={200}
            style={{ borderRadius: "2rem" }}
            alt=""
          />
          <IconButton
            sx={{ position: "absolute", color: "primary.main" }}
            onClick={resetPostImage}
            size="large"
          >
            <CancelIcon />
          </IconButton>
        </div>
      ) : (
        <Paper
          component="label"
          sx={{
            width: "20%",
            height: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "2rem",
            backgroundColor: "white",
          }}
        >
          <img src={config.publicFolderUrl + "add-photo.png"} alt="" />
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={changeProfileImage}
          />
        </Paper>
      )}
      <Stack sx={{ width: "30%", alignItems: "center", mt: 4, gap: 4 }}>
        <TextField
          fullWidth
          label="restaurant"
          value={restaurant}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setRestaurant(event.target.value);
          }}
          placeholder="restaurant Name"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RestaurantMenuOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <SelectCity
          city={city}
          setCity={setCity}
          sx={{ height: "5vh", width: "30vw" }}
        />
        <TextField
          multiline
          fullWidth
          placeholder="Enter your experience here... "
          rows={6}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          sx={{
            mt: 3,
            backgroundColor: "background.paper",
            borderRadius: 7,
            "& .MuiOutlinedInput-root": {
              borderRadius: 7,
            },
          }}
          inputProps={{ sx: { color: "#53606D" } }}
        ></TextField>
      </Stack>
      <Box
        sx={{ display: "flex", width: "30%", justifyContent: "center", gap: 2 }}
      >
        <Button
          disableElevation
          variant="contained"
          endIcon={<CloudUploadIcon />}
          disabled={!postImage || !restaurant || !city || !description}
          onClick={uploadPost}
          sx={{
            color: "white",
            backgroundColor: "primary.main",
            ":hover": { backgroundColor: "primary.main" },
            width: "30%",
            height: "6vh",
            mt: 3,
          }}
        >
          Upload Post
        </Button>
        <Button
          disableElevation
          variant="contained"
          endIcon={<DeleteForeverOutlinedIcon />}
          onClick={clearFields}
          sx={{
            color: "white",
            background: "#ff9800",
            ":hover": { backgroundColor: "#ff9800" },
            width: "30%",
            height: "6vh",
            mt: 3,
          }}
        >
          Clear
        </Button>
      </Box>
    </Stack>
  );
}

export default UploadPost;
