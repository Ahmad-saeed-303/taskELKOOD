import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { Zoom } from "@mui/material";
import JobApplicationsDialog from "./JobApplicationsDialog";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobListings")) || [];
    setJobs(storedJobs);
  }, []);

  const handleOpenDialog = (jobId) => {
    setSelectedJobId(jobId);
  };

  const handleCloseDialog = () => {
    setSelectedJobId(null);
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Zoom in timeout={300 * (index + 1)}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography color="textSecondary">Hours: {job.hours}</Typography>
                  <Typography color="textSecondary">City: {job.city}</Typography>
                  <Typography variant="body2" mt={1}>
                    {job.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleOpenDialog(job.id)}
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
          onClose={handleCloseDialog}
          jobs={jobs}
          setJobs={setJobs}
        />
      )}
    </Box>
  );
};

export default JobListings;