import { useNavigate, To } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { RoleTypes } from "../types/users";

type UserAction = { type: "link"; href: To } | { type: "logOut" };

const USEROPTS: { tag: string; action: UserAction; role: RoleTypes }[] = [
  {
    tag: "My Profile",
    action: { type: "link", href: "/profile" },
    role: "user",
  },
  {
    tag: "Create Account",
    action: { type: "link", href: "/signup" },
    role: "admin",
  },
  { tag: "Sign Out", action: { type: "logOut" }, role: "user" },
];

function UserNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
    action: UserAction
  ) => {
    setAnchorEl(null);

    switch (action.type) {
      case "link":
        setSelectedIndex(index);
        navigate(action.href);
        break;
      case "logOut":
        setSelectedIndex(undefined);
        logout();
        navigate("/");
        break;
      default:
        console.warn("Unknown action type.");
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {!user && (
        <Button
          onClick={() => navigate("/login")}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Sign In
        </Button>
      )}
      {user && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="User settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
          >
            {USEROPTS.map((option, index) =>
              user.roles.includes(option.role) ? (
                <MenuItem
                  key={option.tag}
                  onClick={(event) =>
                    handleMenuItemClick(event, index, option.action)
                  }
                  selected={index === selectedIndex}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {option.tag}
                  </Typography>
                </MenuItem>
              ) : null
            )}
          </Menu>
        </Box>
      )}
    </>
  );
}

export { UserNav };
