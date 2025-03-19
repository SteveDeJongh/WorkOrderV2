import { NavBar } from "./NavBar";
import { UserNav } from "./UserNav";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Container from "@mui/material/Container";

type NavClickHandler = (
  event: React.MouseEvent<HTMLElement>,
  index: number,
  href: string
) => void;

function Header() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleNavClick: NavClickHandler = (event, index, href) => {
    setAnchorElNav(null);

    setSelectedIndex(index);
    navigate(href);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const typographyStyle = {
    mr: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{ ...typographyStyle, display: { xs: "none", md: "flex" } }}
            onClick={() => {
              navigate("/");
              setSelectedIndex(undefined);
              setAnchorElNav(null);
            }}
          >
            WorkOrder
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="page nav"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <NavBar
              menu={true}
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              handleNavClick={handleNavClick}
              selectedIndex={selectedIndex}
            />
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              ...typographyStyle,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
            onClick={() => {
              navigate("/");
              setSelectedIndex(undefined);
              setAnchorElNav(null);
            }}
          >
            WorkOrder
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavBar
              menu={false}
              anchorElNav={anchorElNav}
              handleCloseNavMenu={handleCloseNavMenu}
              handleNavClick={handleNavClick}
              selectedIndex={selectedIndex}
            />
          </Box>
          <UserNav />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export { Header };
