import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import Explore from "@/pages/explore/Explore";
import UploadPost from "@/pages/upload-post/UploadPost";
import Layout from "@/components/Layout";
import UserContextProvider from "@/common/context/UserContext";
import Comments from "@/pages/comments/Comments";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/edit-profile/EditProfile";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./pages/not-found/NotFound";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<RequireAuth children={<Layout />} />}>
          <Route index element={<Explore />} />
          <Route path="comments/:postId" element={<Comments />} />
          <Route path="upload" element={<UploadPost />} />
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
