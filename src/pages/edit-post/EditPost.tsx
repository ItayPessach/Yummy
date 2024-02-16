import { Dialog, DialogTitle } from "@mui/material";
import { PostToEdit, UploadPostDto } from "@/common/types";
import PostForm from "@/components/forms/PostForm";
import postsService from "@/services/postsService.ts";

interface Props {
  open: boolean;
  postToEdit: PostToEdit;
  onClose: (isEdited?: boolean) => void;
}

function EditPost({ open, onClose, postToEdit }: Props) {
  const { postId, ...post } = postToEdit;
  const editPost = async (data: UploadPostDto) => {
    const { request: editPost } = postsService.editPost(postId, data);

    try {
      await editPost;
      onClose(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiPaper-root": {
          borderRadius: "1rem",
          padding: "20px",
        },
      }}
    >
      <DialogTitle
        variant="h5"
        fontWeight="bold"
        color="secondary.main"
        align="center"
      >
        Edit Your Post
      </DialogTitle>
      <PostForm
        uploadPostDto={post}
        submitText="Edit Post"
        onSubmitFunc={editPost}
      />
    </Dialog>
  );
}

export default EditPost;
