import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  useTheme,
} from "@mui/material";
import { Zoom } from "@mui/material";
import JobApplicationsDialog from "../components/JobApplicationsDialog";

const EntityDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobListings")) || [];
    setJobs(storedJobs);
  }, []);

  return (
    <Box m="100px">
      <Typography variant="h4" gutterBottom  m="10px">
        Your Posted Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job, index) => (
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
  <Typography variant="h6" color="primary" fontWeight={600} fontSize={20}>
    {job.title.length > 40 ? job.title.slice(0, 40) + "..." : job.title}
  </Typography>
  <Typography color="textSecondary">
    Hours: {job.hours}
  </Typography>
  <Typography color="textSecondary">
    City: {job.city}
  </Typography>
  <Typography
    variant="body2"
    mt={1}
    sx={{
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      minHeight: "70px", 
    }}
  >
    {job.description}
  </Typography>
</CardContent>

                <CardActions>
                  <Button
                    size="small"
                    onClick={() => setSelectedJobId(job.id)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: "10px",
                      px: 2,
                      py: 0.8,
                      color: "#fff",
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#64b5f6" : "#115293",
                      },
                    }}
                  >
                    View Applications ({job.applications.length})
                  </Button>
                </CardActions>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {selectedJobId && (
        <JobApplicationsDialog
          jobId={selectedJobId}
          open={!!selectedJobId}
          onClose={() => setSelectedJobId(null)}
          jobs={jobs}
          setJobs={setJobs}
        />
      )}
    </Box>
  );
};

export default EntityDashboard;
