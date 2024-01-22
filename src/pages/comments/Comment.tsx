import { Comment as CommentType } from "@/common/types";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import defaultUserImage from "../../assets/defaultUserImage.png";
import { calculateTimeAgo } from "@/common/utils/calculateTimeAgo";
import { useEffect, useState } from "react";

interface Props {
  comment: CommentType;
}

function Comment({ comment }: Props) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setTimeAgo(calculateTimeAgo(comment.createdAt));
  }, [comment.createdAt]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "background.paper",
        borderRadius: 7,
        mt: 3,
        p: 2,
        gap: 4,
      }}
    >
      <Avatar
        src={comment.user.profileImage ?? defaultUserImage}
        sx={{ width: 56, height: 56 }}
      ></Avatar>
      <Stack
        key={comment._id}
        sx={{
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {comment.user.fullname}
          </Typography>
          <Typography variant="body2" color="secondary.100">
            {timeAgo}
          </Typography>
        </Box>
        <Typography variant="body1">{comment.body}</Typography>
      </Stack>
    </Box>
  );
}

export default Comment;
