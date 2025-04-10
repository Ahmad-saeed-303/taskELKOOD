import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Fade,
  Paper,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("person");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      alert("Email already registered. Please log in.");
      navigate("/login");
    } else {
      const user = { id: Date.now(), name, email, role };
      localStorage.setItem("users", JSON.stringify([...users, user]));
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(role === "person" ? "/" : "/entity-dashboard");
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
            maxWidth: 450,
            width: "100%",
            borderRadius: "20px",
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Create Account ✨
          </Typography>

          <Box display="grid" gap="20px" mt={2}>
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel value="person" control={<Radio />} label="Person" />
              <FormControlLabel value="entity" control={<Radio />} label="Entity" />
            </RadioGroup>

            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
              fullWidth
              sx={{ fontWeight: "bold", borderRadius: "12px", py: 1.5 }}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/login")}
              fullWidth
              sx={{ borderRadius: "12px", py: 1.5 }}
            >
              Already have an account? Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default Register;
