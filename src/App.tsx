import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/login/Login';
import Register from '@/pages/register/Register';
import Explore from '@/pages/explore/Explore';
import UploadPost from '@/pages/upload-post/UploadPost';
import Layout from '@/components/Layout';
import { UserContextProvider } from './context/UserContext';
import Comments from './pages/comments/Comments';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="explore" element={<Explore />} />
          <Route path="comments/:postId" element={<Comments />} />
          <Route path="upload" element={<UploadPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
