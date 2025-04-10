import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Divider,
} from "@mui/material";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const JobApplicationsDialog = ({ jobId, open, onClose, jobs, setJobs }) => {
  const job = jobs.find((j) => j.id === jobId) || {};
  const navigate = useNavigate();
  const theme = useTheme();

  const handleAction = (appId, action) => {
    const updatedJobs = jobs.map((j) =>
      j.id === jobId
        ? {
            ...j,
            applications: j.applications.map((app) =>
              app.id === appId ? { ...app, status: action } : app
            ),
          }
        : j
    );
    setJobs(updatedJobs);
    localStorage.setItem("jobListings", JSON.stringify(updatedJobs));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          p: 2,
        },
      }}
    >
      <DialogTitle
  sx={{
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  Applications for {job.title}
  <IconButton onClick={onClose}>
    <CloseIcon />
  </IconButton>
</DialogTitle>

      <DialogContent >
        {job.applications && job.applications.length > 0 ? (
          <List>
            {job.applications.map((app) => (
              <Box key={app.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography fontWeight="bold" color="primary">
                        {app.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {app.email}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.5 }}>
                          Status:{" "}
                          <strong style={{ textTransform: "capitalize" }}>
                            {app.status}
                          </strong>
                        </Typography>
                        <Box
                          display="flex"
                          gap={1.5}
                          mt={2}
                          flexWrap="wrap"
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              navigate(`/applicant/${app.id}`)
                            }
                          >
                            View Details
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleAction(app.id, "accepted")}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleAction(app.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </List>
        ) : (
          <Typography textAlign="center" mt={2}>
            No applications yet.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationsDialog;
