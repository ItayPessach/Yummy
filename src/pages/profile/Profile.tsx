import { useNavigate } from "react-router-dom";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useUserContext } from "@/common/context/useUserContext";
import defaultUserImage from "@/assets/defaultUserImage.png";
const env = import.meta.env;

function Profile() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const editProfile = () => {
    console.log(env.VITE_UPLOAD_FOLDER_PATH + user?.profileImage);
    console.log("edit profile");
    navigate("/profile/edit");
  };

  return (
    <Stack sx={{ p: 10, mx: "auto", justifyContent: "space-between", gap: 4 }}>
      <Typography
        variant="h4"
        textAlign="center"
        color="secondary.main"
        fontWeight="bold"
      >
        Welcome {user?.fullName.split(" ")[0]}!
      </Typography>
      <Avatar
        src={
          user?.profileImage
            ? env.VITE_UPLOAD_FOLDER_PATH + user.profileImage
            : defaultUserImage
        }
        sx={{ width: 280, height: 280, mx: "auto" }}
      ></Avatar>
      <Typography
        variant="h4"
        textAlign="center"
        color="secondary.main"
        fontWeight="bold"
      >
        Subscribing For Restaurants In {user?.homeCity}
      </Typography>
      <Button
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          width: "13vw",
          height: "6vh",
          mt: 2,
          mx: "auto",
          gap: 1,
          ":hover": { backgroundColor: "primary.main" },
        }}
        onClick={editProfile}
      >
        <Typography variant="h6" fontWeight="bold">
          Edit Profile
        </Typography>
        <EditOutlinedIcon />
      </Button>
    </Stack>
  );
}

export default Profile;
