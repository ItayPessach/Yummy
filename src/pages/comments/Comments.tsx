import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Comment as CommentType } from "@/common/types";
import Comment from "./Comment";
import postsService from "@/services/postsService";

function Comments() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!postId) navigate("/");

    const { request, cancel } = postsService.getPost(postId!);

    request
      .then((res) => {
        if (!res.data) navigate("/");
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });

    return () => {
      cancel();
    };
  }, [postId]);

  const postComment = () => {
    const { request } = postsService.addCommentToPost(
      {
        body: commentText,
        date: new Date(),
      },
      postId!
    );

    request
      .then((res) => {
        setComments(res.data as unknown as CommentType[]);
        setCommentText("");
      })
      .catch((err) => {
        console.log(err);
      });
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
