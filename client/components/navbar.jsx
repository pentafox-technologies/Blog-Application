import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import NavLogo from "@mui/icons-material/BookRounded";
import LogoutIcon from '@mui/icons-material/Logout';
// import { cookies } from 'next/headers';
import Link from "next/link";

import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import { Image } from 'react-bootstrap';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const pages = [
  { name: "Home", link: "/home", toLogIn: false },
  { name: "Write", link: "/editor", toLogIn: true },
  { name: "Blogs", link: "/blogs", toLogIn: false },
];
const settings = ["profile", "dashboard", "Logout"];

function Navbar({ token = null, userName = null, pic = null }) {
  // const cookieStore = cookies();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profileName, setProfileName] = React.useState("pname");

  const vertical = "top";
  const horizontal = "center";
  const [open, setOpen] = React.useState(false);
  const API = `http://localhost:5000`;

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getValues = async () => {
    try {
      await axios
        .get(`http://localhost:5000/api/v1/user/${userName}`)
        .then((response) => {
          const pp = response.data.data.profilePic;
          setProfileName(pp);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [token]);

  useEffect(() => {
    getValues();
  }, [pic]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const myLoader = ({ src }) => {
    console.log(`${API}/profilePic/${profileName}`);
    return `${API}/profilePic/${profileName}`;
  };

  function logout() {
    Cookies.remove("token");
    Cookies.remove("userType");
    Cookies.remove("userName");
    handleClick();
    router.push("/login");
  }

  function isLoggedIn() {
    return false;
  }

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  // let userNameFirst;
  // useEffect(() => {
  //   const hello = cookies().get('userName')?.value;
  //   setUserName(hello);
  // },[])
  console.log(token, userName);

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#ffffff", color: "black", width: "100%" }}
    >
      <Container maxWidth="xl">
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%", padding: "10px 20px" }}
          >
            Logged Out Successfully
          </Alert>
        </Snackbar>
        <Toolbar disableGutters>
          <NavLogo sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Blog App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.link}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <NavLogo sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Blog App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {!token &&
              pages
                .filter((page) => !page.toLogIn)
                .map((page) => (
                  <Link href={page.link} className="Links">
                    <Button
                      style={{ color: "grey", fontWeight: "600" }}
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                ))}
            {token &&
              pages.map((page) => (
                <Link href={page.link} className="Links">
                  <Button
                    style={{ color: "grey", fontWeight: "600" }}
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
          </Box>
          <Box sx={{ flexGrow: 0, mr: 1.2 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {token && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Image
                      loader={myLoader}
                      src={`${API}/profilePic/${profileName}`}
                      alt="userProfile"
                      style={{
                        borderRadius: "50%",
                        height: "40px",
                        width: "40px",
                      }}
                    />
                  </IconButton>
                </Tooltip>
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
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          href="/profile"
                        >
                          {setting}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            {!token && (
              <Button
                variant="contained"
                style={{ background: "#6246ea", color: "#fffffe" }}
              >
                {" "}
                <Link
                  href="/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Login/SignUp
                </Link>{" "}
              </Button>
            )}
            {token && (
              <LogoutIcon
                sx={{ ml: 2, color: "black" }}
                style={{ cursor: "pointer" }}
                onClick={logout}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();
  return {
    props: {
      articles,
    },
  };
};