import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardActions, Button, Grid, TextField, MenuItem } from "@mui/material";
import { Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const PersonDashboard = () => {
  const theme = useTheme(); 
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterHours, setFilterHours] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobListings")) || [];
    setJobs(storedJobs);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = (() => {
      if (!search) return true;
      const terms = search.toLowerCase().split(" ");
      const text = `${job.title} ${job.description}`.toLowerCase();
      return terms.every((term) => text.includes(term));
    })();
        const matchesCity = filterCity ? job.city === filterCity : true;
    const matchesHours = filterHours ? job.hours === filterHours : true;
    return matchesSearch && matchesCity && matchesHours;
  });

  const cities = [...new Set(jobs.map((job) => job.city))];
  const hours = [...new Set(jobs.map((job) => job.hours))];

  return (
    <Box m="100px">
      <Typography variant="h4" gutterBottom>Available Jobs</Typography>
      <Box display="flex" gap="10px" mb="20px">
        <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth />
        <TextField select label="Filter by City" value={filterCity} onChange={(e) => setFilterCity(e.target.value)} sx={{ minWidth: 150 }}>
          <MenuItem value="">All</MenuItem>
          {cities.map((city) => <MenuItem key={city} value={city}>{city}</MenuItem>)}
        </TextField>
        <TextField select label="Filter by Hours" value={filterHours} onChange={(e) => setFilterHours(e.target.value)} sx={{ minWidth: 150 }}>
          <MenuItem value="">All</MenuItem>
          {hours.map((hour) => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)}
        </TextField>
      </Box>
      <Grid container spacing={3}>
        {filteredJobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Zoom in timeout={300 * (index + 1)}>
            <Card
sx={{
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  p: 2,
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(10px)",
  border: "1px solid",
  borderColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)",
  boxShadow: 4,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    cursor:"pointer"
  },
}}
>
  <CardContent sx={{ flexGrow: 1 }}>
    <Typography variant="h6" color="text.primary" fontWeight={600} fontSize={20}>
      {job.title}
    </Typography>
    <Typography color="textSecondary">Hours: {job.hours}</Typography>
    <Typography color="textSecondary">City: {job.city}</Typography>
    <Typography variant="body2" mt={1} color="text.secondary"
     sx={{
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      minHeight: "70px", 
    }}>
      {job.description}
    </Typography>
  </CardContent>
  <CardActions>
    <Button
      size="small"
      variant="contained"
      sx={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        "&:hover": {
          backgroundColor: theme.palette.secondary.dark,
        },
      }}
      onClick={() => navigate(`/apply/${job.id}`)}
    >
      Apply
    </Button>
  </CardActions>
</Card>

            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PersonDashboard;