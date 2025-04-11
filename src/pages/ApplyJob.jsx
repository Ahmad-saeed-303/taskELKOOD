import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Fade,
  Tooltip,
  IconButton,
  Paper,
  useTheme,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [cvFile, setCvFile] = useState(null);
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFormSubmit = (values, { resetForm }) => {
    const jobs = JSON.parse(localStorage.getItem("jobListings")) || [];
    const newApplication = {
      id: Date.now(),
      name: values.name,
      phone: values.phone,
      email: values.email,
      cv: cvFile ? cvFile.name : "No CV uploaded",
      status: "pending",
    };
    const updatedJobs = jobs.map((job) =>
      job.id === Number(jobId)
        ? { ...job, applications: [...(job.applications || []), newApplication] }
        : job
    );
    localStorage.setItem("jobListings", JSON.stringify(updatedJobs));
    resetForm();
    setCvFile(null);
    setOpenSnackbar(true);
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <Fade in timeout={600}>
      <Box
        px={{ xs: 2, sm: 6 }}
        py={{ xs: 6, sm: 10 }}
        width={{ xs: "100%", sm: "80%", md: "60%" }}
        mx="auto"
        mt={{ xs: 12, sm: 10 , lg:15 }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: { xs: 3, sm: 4 },
            borderRadius: 3,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            color="secondary"
            fontSize={{ xs: "1.8rem", sm: "2.2rem" }}
            textAlign="center"
          >
            Apply for Job
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={applySchema}
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
                <Box display="grid" gap={3}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Phone"
                    name="phone"
                    value={values.phone}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />

                  <Box
                    display="flex"
                    flexDirection={isMobile ? "column" : "row"}
                    alignItems={isMobile ? "flex-start" : "center"}
                    gap={2}
                  >
                    <Tooltip title="Upload your CV">
                      <IconButton
                        color="secondary"
                        component="label"
                        sx={{
                          border: "1px solid",
                          borderRadius: 2,
                          padding: 1.2,
                          width: "fit-content",
                        }}
                      >
                        <UploadFileIcon />
                        <input
                          hidden
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setCvFile(e.target.files[0])}
                        />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      variant="body2"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {cvFile ? cvFile.name : "No file selected"}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: "bold",
                      borderRadius: 2,
                      boxShadow: 3,
                      textTransform: "none",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    Submit Application
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Paper>

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
            Application submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
};

const applySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const initialValues = {
  name: "",
  phone: "",
  email: "",
};

export default ApplyJob;
