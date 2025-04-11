import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Fade,
  Snackbar,
  Alert,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); 

  useEffect(() => {
    const jobs = localStorage.getItem("jobListings");
    if (!jobs) localStorage.setItem("jobListings", JSON.stringify([]));
  }, []);

  const handleFormSubmit = (values, { resetForm }) => {
    const currentJobs = JSON.parse(localStorage.getItem("jobListings")) || [];
    const newJob = {
      id: Date.now(),
      title: values.title,
      hours: values.hours,
      city: values.city,
      description: values.description,
      applications: [],
    };
    localStorage.setItem("jobListings", JSON.stringify([...currentJobs, newJob]));
    resetForm();
    setOpenSnackbar(true); 
    setTimeout(() => navigate("/entity-dashboard"), 1000); 
  };

  return (
    <Fade in timeout={600}>
      <Box
        m="200px"
        maxWidth="50%"
        mx="auto"
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          boxShadow: 4,
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: 600 }}
        >
          Post a New Job
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={jobSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns={isNonMobile ? "1fr 1fr" : "1fr"}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Job Title"
                  name="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Working Hours"
                  name="hours"
                  value={values.hours}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.hours && !!errors.hours}
                  helperText={touched.hours && errors.hours}
                  type="number"
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="City"
                  name="city"
                  value={values.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Job Description"
                  name="description"
                  multiline
                  rows={4}
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    mb: 3,
                    px: 3,
                    py: 1.2,
                    borderRadius: "12px",
                    fontWeight: 600,
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                    color: "#fff",
                    boxShadow: 3,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark" ? "#64b5f6" : "#115293",
                    },
                  }}
                >
                  Post Job
                </Button>
              </Box>
            </form>
          )}
        </Formik>

        {/* ✅ Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Job posted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
};

const jobSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  hours: yup
    .number()
    .typeError("Working hours must be a number")
    .required("Working hours are required"),
  city: yup.string().required("City is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});

const initialValues = {
  title: "",
  hours: "",
  city: "",
  description: "",
};

export default PostJob;
