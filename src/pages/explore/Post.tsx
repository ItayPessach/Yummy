import { Box, Grid } from "@mui/material";

import userBase64Png from "../../images/profiles/user";
import gdbBase64Png from "../../images/posts/gdb";

const mockPost = {
  id: "123456789",
  restaurant: "GDB",
  description:
    "Yesterday I eat at this place And It was amazing, the fries were so crispy and i cant even describe this uniuqunique burger ",
  image: gdbBase64Png,
  city: "Tel Aviv",
  user: {
    name: "Itay Hasson",
    image: userBase64Png,
  },
  createdAt: Date.now().toString(),
  comments: [
    {
      id: "172658781",
      username: "Itay Pessach",
      createdAt: Date.now().toString(),
      body: "Wow, this looks amazing!",
    },
  ],
};

interface Props {
  post?: {
    // TODO: replace with real post type that must be passed from parent
    id: string;
    restaurant: string;
    description: string;
    image: string; // base64
    city: string;
    user: {
      name: string;
      image: string; // base64
    };
    createdAt: string;
    comments: {
      id: string;
      username: string;
      createdAt: string;
      body: string;
    }[];
  };
}

function Post({ post = mockPost }: Props) {
  return (
    <Grid item md={4}>
      <Box
        component="img"
        alt={post.restaurant}
        src={`data:image/png;base64, ${post.image}`} // TODO: check if we should use this or just src={post.image}
      />
    </Grid>
  );
}

export default Post;
