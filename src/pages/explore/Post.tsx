import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PostOptions from "./PostOptions";
import defaultUserImage from "../../assets/defaultUserImage.png";

// TODO: remove mock data
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
  createdAt: new Date(),
  comments: [
    {
      id: "172658781",
      username: "Itay Pessach",
      createdAt: new Date(),
      body: "Wow, this looks amazing!",
    },
  ],
};

interface Props {
  // TODO: replace with real post type that must be passed from parent (remove optional)
  post?: {
    id: string;
    restaurant: string;
    description: string;
    image: string; // base64
    city: string;
    user: {
      name: string;
      image: string; // base64
    };
    createdAt: Date;
    comments: {
      id: string;
      username: string;
      createdAt: Date;
      body: string;
    }[];
  };
}

function Post({ post = mockPost }: Props) {
  return (
    <Grid item md={3}>
      <Card sx={{ backgroundColor: "#00C2E8", position: "relative" }}>
        <PostOptions />
        <CardMedia
          title={post.restaurant}
          sx={{
            height: "25vh",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={`data:image/png;base64, ${post.image}`} // TODO: check if we should use this or just src={post.image}
            alt={post.restaurant}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              filter: "blur(10px)",
              transform: "scale(1.1)",
            }}
          />
          <Box
            component="img"
            src={`data:image/png;base64, ${post.image}`}
            alt={post.restaurant}
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </CardMedia>
        <CardContent sx={{ mt: 1 }}>
          <Grid container>
            <Grid md={10}>
              <Typography
                variant="h6"
                fontWeight="bold"
                color="white"
                sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}
              >
                {post.restaurant}
                <Tooltip title={post.user.name} placement="top">
                  <Avatar
                    src={
                      post.user.image
                        ? `data:image/png;base64, ${post.user.image}`
                        : defaultUserImage
                    }
                    alt={post.user.name}
                    sx={{
                      width: "3vh",
                      height: "3vh",
                      borderRadius: "50%",
                      ml: 1,
                    }}
                  ></Avatar>
                </Tooltip>
              </Typography>
              <Typography variant="body2" color="white">
                {post.city}
              </Typography>
              <Typography variant="body1" color="white">
                {post.description}
              </Typography>
            </Grid>
            <Grid
              md={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body1"
                color="white"
                sx={{
                  mx: "auto",
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                {post.comments.length}
                <ChatOutlinedIcon />
              </Typography>
              <Typography variant="body2" color="white" sx={{ mx: "auto" }}>
                {post.createdAt.toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Post;
