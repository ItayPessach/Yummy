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
import { useNavigate } from "react-router-dom";
import { Post as PostType } from "@/types";
import PostOptions from "./PostOptions";
import defaultUserImage from "../../assets/defaultUserImage.png";

// TODO: remove mock data
import userBase64Png from "../../images/profiles/user";
import gdbBase64Png from "../../images/posts/gdb";

const mockPost = {
  _id: "123456789",
  restaurant: "GDB",
  description:
    "Yesterday I eat at this place And It was amazing, the fries were so crispy and i cant even describe this uniuqunique burger ",
  image: gdbBase64Png,
  city: "Tel Aviv",
  user: {
    _id: "123456710",
    name: "Itay Hasson",
    username: "HASOS",
    email: "123@123.123",
    profilePicture: userBase64Png,
  },
  comments: ["172658781"],
  createdAt: new Date(),
};

interface Props {
  // TODO: replace with real post type that must be passed from parent (remove optional)
  post?: PostType;
}

function Post({ post = mockPost }: Props) {
  const navigate = useNavigate();

  const onExpandClick = () => {
    navigate(`/comments/${post._id}`);
  };

  return (
    <Grid item md={3}>
      <Card sx={{ backgroundColor: "#00C2E8", position: "relative" }}>
        <PostOptions
          postedByUserId={post.user._id}
          onExpandClick={onExpandClick}
        />
        <CardMedia
          title={post.restaurant}
          sx={{
            height: "25vh",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={post.image}
            alt={post.restaurant}
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              filter: "blur(10px)",
              transform: "scale(1.1)",
              pointerEvents: "none",
            }}
          />
          <Box
            component="img"
            src={post.image}
            alt={post.restaurant}
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        </CardMedia>
        <CardContent sx={{ mt: 1 }}>
          <Grid container>
            <Grid md={10}>
              <Typography
                variant="h6"
                color="white"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                {post.restaurant}
                <Tooltip title={post.user.name} placement="top">
                  <Avatar
                    src={
                      post.user.profilePicture
                        ? post.user.profilePicture
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
