import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Fade,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(user.role === "person" ? "/dashboard" : "/entity-dashboard");
    } else {
      setError("User not found. Please register first.");
    }
  };

  return (
    <Fade in timeout={600}>
      <Box
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 400,
            width: "100%",
            borderRadius: "20px",
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Welcome Back 👋
          </Typography>

          <Box display="grid" gap="20px" mt={2}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              sx={{ fontWeight: "bold", borderRadius: "12px", py: 1.5 }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/register")}
              fullWidth
              sx={{ borderRadius: "12px", py: 1.5 }}
            >
              Don’t have an account? Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default Login;
