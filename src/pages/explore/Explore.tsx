import { useEffect, useRef, useState } from "react";
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
  const scrolledElementRef = useRef<HTMLDivElement | null>(null);

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
        if (res.data.length !== 0)
          setPosts((prevPosts) => [...prevPosts, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      cancel();
    };
  }, [page, selectedCity, isShowOnlyMyPosts]);

  useEffect(() => {
    const handleScroll = () => {
      const gridElement = scrolledElementRef.current as HTMLDivElement;
      if (gridElement) {
        const { scrollTop, scrollHeight, clientHeight } = gridElement;
        const heightRemainToScroll = scrollHeight - scrollTop - clientHeight;
        const treshold = (scrollHeight - scrollTop) * 0.1;

        if (heightRemainToScroll <= treshold) {
          gridElement.removeEventListener("scroll", handleScroll);
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const gridElement = scrolledElementRef.current as HTMLDivElement;
    if (gridElement) {
      gridElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [posts]);

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
        ref={scrolledElementRef}
      >
        {posts.map((post, index) => (
          <Post post={post} deletePost={deletePost} key={index} />
        ))}
      </Grid>
    </Stack>
  );
}

export default Explore;
