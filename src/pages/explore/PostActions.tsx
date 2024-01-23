import { Box, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";
import { useUserContext } from "@/common/context/useUserContext";

interface Props {
  userId: string;
  onExpandClick: () => void;
}

// TODO: implement delete post and edit post
function PostActions({ userId, onExpandClick }: Props) {
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
      {user?._id === userId && (
        <Box sx={{ mr: "auto" }}>
          <IconButton
            sx={{
              color: "primary.main",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.75)",
              },
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "primary.main",
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
        onClick={onExpandClick}
        sx={{
          ml: "auto",
          color: "primary.main",
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

export default PostActions;
