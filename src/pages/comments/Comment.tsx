import { Comment as CommentType } from "@/types";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import defaultUserImage from "../../assets/defaultUserImage.png";

interface Props {
  comment: CommentType;
}

function Comment({ comment }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        borderRadius: "10px",
        backgroundColor: "#DDF4F8",
        mt: 3,
        p: 2,
        gap: 2,
      }}
    >
      <Avatar src={comment.user.profilePicture ?? defaultUserImage}></Avatar>
      <Stack
        key={comment._id}
        sx={{
          gap: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {comment.user.username}
        </Typography>
        <Typography variant="body1">{comment.body}</Typography>
      </Stack>
    </Box>
  );
}

export default Comment;
