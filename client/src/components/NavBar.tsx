import { Button, Menu, MenuItem, Typography } from "../utils/muiImports";

type Page = {
  title: string;
  href: string;
};

const PAGES: Page[] = [
  { title: "Customers", href: "/customers" },
  { title: "Products", href: "/products" },
  { title: "Invoices", href: "/Invoices" },
];

type Props = {
  menu: boolean;
  anchorElNav: HTMLElement | null;
  handleCloseNavMenu: () => void;
  handleNavClick: (
    event: React.MouseEvent<HTMLElement>,
    index: number,
    href: string
  ) => void;
  selectedIndex?: number;
};

function NavBar({
  menu,
  anchorElNav,
  handleCloseNavMenu,
  handleNavClick,
  selectedIndex,
}: Props) {
  return (
    <>
      {menu && (
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {PAGES.map((page, index) => (
            <MenuItem
              key={page.title}
              onClick={(event) => handleNavClick(event, index, page.href)}
              selected={selectedIndex === index}
            >
              <Typography sx={{ textAlign: "center" }}>{page.title}</Typography>
            </MenuItem>
          ))}
        </Menu>
      )}
      {!menu &&
        PAGES.map((page, index) => (
          <Button
            key={page.title}
            onClick={(event) => handleNavClick(event, index, page.href)}
            sx={{ my: 2, color: "white", display: "block" }}
            disabled={selectedIndex === index}
          >
            {page.title}
          </Button>
        ))}
    </>
  );
}

export { NavBar };
