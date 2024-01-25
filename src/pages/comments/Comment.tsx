import { IComment } from "@/common/types";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { calculateTimeAgo } from "@/common/utils/calculateTimeAgo";
import { useEffect, useState } from "react";
const env = import.meta.env;

interface Props {
  comment: IComment;
}

function Comment({ comment }: Props) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setTimeAgo(calculateTimeAgo(new Date(comment.date)));
  }, [comment.date]);

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
        src={
          comment.user.profileImage
            ? env.VITE_UPLOAD_FOLDER_URL + comment.user.profileImage
            : env.VITE_PUBLIC_FOLDER_URL + "profile.png"
        }
        sx={{ width: 56, height: 56 }}
      ></Avatar>
      <Stack
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
            {comment.user.fullName}
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
