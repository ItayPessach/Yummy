import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Comment as CommentType } from "@/types";
import Comment from "./Comment";
import { useUserContext } from "@/context/useUserContext";

const mockComment: CommentType = {
  _id: "172658781",
  user: {
    _id: "172658781",
    username: "Itay Pessach",
    fullname: "Itay Pessach",
    email: "",
    profilePicture: undefined, // base64
    homeCity: "Tel Aviv",
    token: "1",
  },
  createdAt: new Date(),
  body: "This looks such a good place. i must go there and try the new burger! ",
};

function Comments() {
  const { user } = useUserContext();
  const { postId } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    // TODO: fetch comments by postId and setComments
    setComments([mockComment]);
  }, [postId]);

  const postComment = () => {
    const commentToPost = {
      user,
      body: commentText,
      createdAt: new Date(),
    };
    // TODO: Post request - send comment to server
    console.log(commentToPost);
  };

  return (
    <Stack sx={{ p: 4 }}>
      <Typography
        variant="h4"
        color="secondary.main"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 1.5 }}
      >
        Post Comments
      </Typography>
      <Box sx={{ height: "58vh", overflowY: "auto" }}>
        {comments.map((comment) => (
          <Comment comment={comment} />
        ))}
      </Box>
      <TextField
        multiline
        placeholder="Enter your Comment here... "
        rows={4}
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
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
      <Button
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          width: "15vw",
          height: "5vh",
          mt: 3,
          mx: "auto",
          gap: 1,
          ":hover": { backgroundColor: "primary.main" },
        }}
        onClick={postComment}
      >
        <Typography variant="button" fontWeight="bold">
          Add Your Own Comment
        </Typography>
        <ControlPointOutlinedIcon />
      </Button>
    </Stack>
  );
}

export default Comments;
