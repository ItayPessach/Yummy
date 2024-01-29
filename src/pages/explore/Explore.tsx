import { useEffect, useRef, useState } from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import AntSwitch from "../../components/AntSwitch";
import Post from "./Post";
import postsService from "@/services/postsService";
import { IPost } from "@/common/types";
import SelectCity from "@/components/SelectCity";
import userStore from "@/common/store/user.store";
import { observer } from "mobx-react-lite";

const Explore = observer(() => {
  const { user } = userStore;
  const [isShowOnlyMyPosts, setIsShowOnlyMyPosts] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  const scrolledElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedCity(user?.homeCity ?? "");
  }, [user]);

  useEffect(() => {
    setPosts([]);
    setPage(1);
  }, [selectedCity, isShowOnlyMyPosts]);

  useEffect(() => {
    let postsRequest;
    if (isShowOnlyMyPosts) {
      postsRequest = () => {
        return postsService.getByUser(page);
      };
    } else if (selectedCity) {
      postsRequest = () => {
        return postsService.getByCity(selectedCity, page);
      };
    } else {
      // TODO: get posts by no condition
      return;
    }

    const { request, cancel } = postsRequest();
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


  return (
    <Stack sx={{ p: 4, gap: 2 }}>
      <Stack spacing={2} sx={{ height: '10vh'}}>
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
          <SelectCity
            city={selectedCity}
            setCity={setSelectedCity}
            sx={{ width: "20vw", height: "5vh" }}
          />
        )}
      </Stack>
      <Grid
        container
        spacing={3}
        sx={{ maxHeight: "75vh", overflowY: "auto", mt: 1, pr: 2 }}
        ref={scrolledElementRef}
      >
        {posts.map((post, index) => (
          <Post post={post} setPosts={setPosts} key={index} />
        ))}
      </Grid>
    </Stack>
  );
});

export default Explore;
