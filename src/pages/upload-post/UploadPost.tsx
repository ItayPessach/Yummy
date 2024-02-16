import { Stack, Typography } from "@mui/material";
import PostForm from "@/components/forms/PostForm";
import postsService from "@/services/postsService.ts";
import { UploadPostDto } from "@/common/types";
import { useNavigate } from "react-router-dom";

function UploadPost() {
  const navigate = useNavigate();
  const uploadPost = async (data: UploadPostDto) => {
    const { request: uploadPost } = postsService.uploadPost(data);

    try {
      await uploadPost;
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Stack sx={{ alignItems: "center", mt: 5, gap: 2, height: "100vh", pb: 4 }}>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", color: "secondary.main" }}
      >
        Upload Your New Food Experience Here
      </Typography>
      <PostForm
        sx={{ width: "30%" }}
        uploadPostDto={{
          restaurant: "",
          description: "",
          city: "",
          picture: undefined,
        }}
        submitText="Upload Post"
        onSubmitFunc={uploadPost}
      />
    </Stack>
  );
}

export default UploadPost;
