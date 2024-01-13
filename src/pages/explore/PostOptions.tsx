import { Box, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";
import { useUserContext } from "@/context/UserContext";

interface Props {
  postedByUserId: string;
}

function PostOptions({ postedByUserId }: Props) {
  const { user } = useUserContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        zIndex: 1,
        pt: 1,
      }}
    >
      {user?._id === postedByUserId && (
        <Box sx={{ mr: "auto" }}>
          <IconButton
            sx={{
              color: "#00C2E8",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.75)",
              },
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "#00C2E8",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.75)",
              },
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
        </Box>
      )}
      <IconButton
        sx={{
          ml: "auto",
          color: "#00C2E8",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
        }}
      >
        <OpenWithOutlinedIcon />
      </IconButton>
    </Box>
  );
}

export default PostOptions;
