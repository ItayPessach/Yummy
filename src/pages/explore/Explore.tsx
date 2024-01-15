import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Grid,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AntSwitch from '../../components/AntSwitch';
import Post from './Post';
import { useUserContext } from '@/context/UserContext';

function Explore() {
  const { user } = useUserContext();
  const [isShowOnlyMyPosts, setIsShowOnlyMyPosts] = useState(true);
  const [selectedCity, setSelectedCity] = useState(user?.homeCity ?? '');

  return (
    <Stack sx={{ p: 4, gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: 'secondary.main', fontWeight: 'bold' }}
        >
          Only My Posts
        </Typography>
        <AntSwitch
          checked={isShowOnlyMyPosts}
          onChange={(event) => setIsShowOnlyMyPosts(event.target.checked)}
          inputProps={{ 'aria-label': 'ant design' }}
          sx={{ my: 'auto' }}
        />
      </Box>
      <TextField
        select
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeOutlinedIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: '20vw', height: '5vh' }}
        value={selectedCity}
        onChange={(event) => setSelectedCity(event.target.value)}
      />
      <Grid
        container
        spacing={3}
        sx={{ maxHeight: '75vh', overflowY: 'auto', mt: 1, pr: 2 }}
      >
        {[1,2,3,4,5].map(() => <Post />)}
      </Grid>
    </Stack>
  );
}

export default Explore;
