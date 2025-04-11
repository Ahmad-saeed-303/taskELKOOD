import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { LogoutSharp } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
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
  left="25%"
  zIndex={1000}
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  p={2}
  width="50%"
  backgroundColor={colors.primary[400]}
  borderRadius="12px"
  sx={{
    borderRadius: "20px",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.04)"
        : "rgba(255,255,255,0.7)",
    backdropFilter: "blur(10px)",
    p: 2,
  }}
>
      <Box
        display="flex"
        borderRadius="3px"
      >
        <Box display="flex" alignItems="center" gap={3}>
        {userRole === "person" && (
          <Button
            component={Link}
            to="/dashboard"
            sx={{ color: colors.grey[100], textTransform: "none" ,fontSize:"15px"}}
          >
            Job Listings
          </Button>
        )}

        {userRole === "entity" && (
          <>
            <Button
              component={Link}
              to="/entity-dashboard"
              sx={{ color: colors.grey[100], textTransform: "none",fontSize:"15px" }}
            >
              Manage Jobs
            </Button>
            <Button
              component={Link}
              to="/post-job"
              sx={{ color: colors.grey[100], textTransform: "none",fontSize:"15px" }}
            >
              Post Job
            </Button>
          </>
        )}
      </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex" >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
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
