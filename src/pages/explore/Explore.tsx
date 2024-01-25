import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Grid,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AntSwitch from "../../components/AntSwitch";
import Post from "./Post";
import { useUserContext } from "@/common/context/useUserContext";
import postsService from "@/services/postsService";
import { IPost } from "@/common/types";

function Explore() {
  const { user } = useUserContext();
  const [isShowOnlyMyPosts, setIsShowOnlyMyPosts] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState(
    user?.homeCity ?? "Tel Aviv" // TODO: change to empty string after implementing cities api
  );

  useEffect(() => {
    setPosts([]);
    setPage(1);
  }, [selectedCity, isShowOnlyMyPosts]);

  useEffect(() => {
    const { request, cancel } = isShowOnlyMyPosts
      ? postsService.getByUser(page)
      : postsService.getByCity(selectedCity, page);

    request
      .then((res) => {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      cancel();
    };
  }, [page, selectedCity, isShowOnlyMyPosts]);

  // TODO: check if it's working
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Define a threshold (e.g., 80% from the bottom) to trigger loading more posts
      const threshold = 0.8;

      if (scrollTop + windowHeight >= threshold * documentHeight) {
        // When the scroll position is close to the bottom, update the page number
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const deletePost = (postId: string) => {
    const { request } = postsService.deletePost(postId);

    request
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack sx={{ p: 4, gap: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: "secondary.main", fontWeight: "bold" }}
        >
          Only My Posts
        </Typography>
        <AntSwitch
          checked={isShowOnlyMyPosts}
          onChange={(event) => setIsShowOnlyMyPosts(event.target.checked)}
          inputProps={{ "aria-label": "ant design" }}
          sx={{ my: "auto" }}
        />
      </Box>
      {!isShowOnlyMyPosts && (
        <TextField
          select
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "20vw", height: "5vh" }}
          value={selectedCity}
          onChange={(event) => setSelectedCity(event.target.value)}
        />
      )}
      <Grid
        container
        spacing={3}
        sx={{ maxHeight: "75vh", overflowY: "auto", mt: 1, pr: 2 }}
      >
        {posts.map((post, index) => (
          <Post post={post} deletePost={deletePost} key={index} />
        ))}
      </Grid>
    </Stack>
  );
}

export default Explore;
