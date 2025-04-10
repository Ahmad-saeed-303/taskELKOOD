import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Fade } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const ApplicantDetails = () => {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobListings")) || [];
    const foundApplicant = jobs
      .flatMap((job) => job.applications)
      .find((app) => app.id === Number(applicantId));
    setApplicant(foundApplicant);
  }, [applicantId]);

  if (!applicant) return <Typography  m="200px" fontSize="40px">Loading...</Typography>;

  return (
    <Fade in timeout={600} >
      <Box m="100px" maxWidth="600px" mx="auto">
        <Typography variant="h4" gutterBottom>Applicant Details</Typography>
        <Typography>Name: {applicant.name}</Typography>
        <Typography>Phone: {applicant.phone}</Typography>
        <Typography>Email: {applicant.email}</Typography>
        <Typography>CV: {applicant.cv}</Typography>
        <Typography>Status: {applicant.status}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate.goBack()} sx={{ mt: 2 }}>
          Back
        </Button>
      </Box>
    </Fade>
  );
};

export default ApplicantDetails;