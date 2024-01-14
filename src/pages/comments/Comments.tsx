import { Comment as CommentType } from "@/types";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const mockComment: CommentType = {
  _id: "172658781",
  user: {
    _id: "172658781",
    username: "Itay Pessach",
    email: "",
    name: "Itay Pessach",
    profilePicture: undefined, // base64
  },
  createdAt: new Date(),
  body: "Wow, this looks amazing!",
};

function Comments() {
  const { postId } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    // TODO: fetch comments by postId and setComments
    setComments([mockComment, mockComment]);
  }, [postId]);

  return (
    <Stack sx={{ p: 4 }}>
      <Typography
        variant="h4"
        color="secondary.main"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}
      >
        Post Comments
      </Typography>
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </Stack>
  );
}

export default Comments;
