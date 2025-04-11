import {
  Box,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { LogoutSharp } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserRole(currentUser.role);
    }
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Box
      position="fixed"
      top={10}
      left={0}
      right={0}
      zIndex={1000}
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      mx="auto"
      px={2}
      py={1}
      maxWidth="1000px"
      backgroundColor={
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.7)"
      }
      borderRadius="20px"
      backdropFilter="blur(10px)"
    >
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={isMobile ? 1 : 0}
      >
        {userRole === "person" && (
          <Button
            component={Link}
            to="/dashboard"
            sx={{ color: colors.grey[100], textTransform: "none", fontSize: "15px" }}
          >
            Job Listings
          </Button>
        )}
        {userRole === "entity" && (
          <>
            <Button
              component={Link}
              to="/entity-dashboard"
              sx={{ color: colors.grey[100], textTransform: "none", fontSize: "15px" }}
            >
              Manage Jobs
            </Button>
            <Button
              component={Link}
              to="/post-job"
              sx={{ color: colors.grey[100], textTransform: "none", fontSize: "15px" }}
            >
              Post Job
            </Button>
          </>
        )}
      </Box>

      <Box display="flex" gap={1} flexWrap="wrap">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutSharp />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
