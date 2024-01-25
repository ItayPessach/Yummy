import { useState, MouseEvent } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import FoodIcon from "@mui/icons-material/Fastfood";
import NavButton from "./NavButton";
import { LinkItem } from "@/common/types";
import { useUserContext } from "@/common/context/useUserContext";
import authService from "@/services/authService";
const env = import.meta.env;

const pages: Array<LinkItem> = [
  {
    path: "/",
    title: "Explore",
  },
  {
    path: "/upload",
    title: "Upload",
  },
];

const settings: Array<LinkItem> = [
  {
    path: "/profile",
    title: "Profile",
  },
  {
    path: "/login",
    title: "Logout", // TODO: add logout request
    callback: () => {
      const { request } = authService.logout();

      request
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
];

function Layout() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const openUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeUserMenu = () => {
    setAnchorElUser(null);
  };
  const selectMenuOption = (path: string) => {
    closeUserMenu();
    navigate(path);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <FoodIcon sx={{ color: "white" }} />
          <Typography variant="h6" component="div" color={"white"} ml={1}>
            Yummy
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            {pages.map((page) => (
              <NavButton path={page.path} title={page.title} key={page.title} />
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={openUserMenu} sx={{ p: 0 }}>
              <Avatar
                src={
                  user?.profileImage
                    ? env.VITE_UPLOAD_FOLDER_PATH + user.profileImage
                    : "profile.png"
                }
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={closeUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={() => {
                    setting.callback && setting.callback();
                    selectMenuOption(setting.path);
                  }}
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Layout;
