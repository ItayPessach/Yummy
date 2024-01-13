import { Box, IconButton, styled } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
}));

function PostOptions() {
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
      <Box sx={{ mr: "auto" }}>
        <StyledIconButton>
          <DeleteOutlinedIcon />
        </StyledIconButton>
        <StyledIconButton>
          <EditOutlinedIcon />
        </StyledIconButton>
      </Box>
      <StyledIconButton>
        <OpenWithOutlinedIcon />
      </StyledIconButton>
    </Box>
  );
}

export default PostOptions;
