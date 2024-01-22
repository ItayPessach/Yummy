import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useNavigate } from "react-router-dom";
import { Post as PostType } from "@/common/types";
import PostActions from "./PostActions";
import defaultUserImage from "../../assets/defaultUserImage.png";

const mockPost = {
  _id: "123456789",
  restaurant: "GDB",
  description:
    "Yesterday I eat at this place And It was amazing, the fries were so crispy and i cant even describe this uniuqunique burger ",
  image: "https://img.mako.co.il/2020/02/11/GDB2_i.jpg",
  city: "Tel Aviv",
  user: {
    _id: "123456710",
    email: "hasos@gmail.com",
    fullname: "HASOS",
    profileImage:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1403",
    homeCity: "Tel Aviv",
    token: "1",
  },
  createdAt: new Date(),
  comments: [],
};

interface Props {
  // TODO: replace with real post type that must be passed from parent (remove optional)
  post?: PostType;
}

function Post({ post = mockPost }: Props) {
  const navigate = useNavigate();

  const showPostComments = () => {
    navigate(`/comments/${post._id}`);
  };

  return (
    <Grid item md={3}>
      <Card
        elevation={0}
        sx={{ backgroundColor: "primary.main", position: "relative" }}
      >
        <PostActions userId={post.user._id} onExpandClick={showPostComments} />
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
        <CardContent sx={{ mt: 2 }}>
          <Stack>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>
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
                </Typography>
                <Tooltip title={post.user.fullname} placement="top">
                  <Avatar
                    src={
                      post.user.profileImage
                        ? post.user.profileImage
                        : defaultUserImage
                    }
                    alt={post.user.fullname}
                    sx={{
                      width: "3vh",
                      height: "3vh",
                      borderRadius: "50%",
                      ml: 1,
                    }}
                  ></Avatar>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1" color="white">
                  {post.comments.length}
                </Typography>
                <ChatOutlinedIcon
                  sx={{ color: "white", width: "20px", ml: 0.5 }}
                />
              </Box>
            </Box>
          </Stack>
          <Grid container>
            <Grid item md={10}>
              <Typography variant="body2" color="white" sx={{ mt: 0.5 }}>
                {post.city}
              </Typography>
              <Typography variant="body1" color="white">
                {post.description}
              </Typography>
            </Grid>
            <Grid
              item
              md={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
              }}
            >
              <Typography variant="body2" color="white">
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
