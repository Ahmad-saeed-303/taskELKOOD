import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const JobApplicationsDialog = ({ jobId, open, onClose, jobs, setJobs }) => {
  const job = jobs.find((j) => j.id === jobId) || {};
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

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
          p: { xs: 1.5, sm: 3 },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.1rem", sm: "1.5rem" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: { xs: 1, sm: 2 },
        }}
      >
        Applications for {job.title}
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 0.5, sm: 1.5 } }}>
        {job.applications && job.applications.length > 0 ? (
          <List disablePadding>
            {job.applications.map((app) => (
              <Box key={app.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{ flexDirection: "column", alignItems: "stretch" }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        fontWeight="bold"
                        color="primary"
                        fontSize={{ xs: "1rem", sm: "1.1rem" }}
                      >
                        {app.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontSize={{ xs: "0.85rem", sm: "0.95rem" }}
                        >
                          {app.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ mt: 0.5 }}
                          fontSize={{ xs: "0.85rem", sm: "0.95rem" }}
                        >
                          Status:{" "}
                          <strong style={{ textTransform: "capitalize" }}>
                            {app.status}
                          </strong>
                        </Typography>
                        <Box
                          display="flex"
                          flexDirection={isMobile ? "column" : "row"}
                          gap={1.2}
                          mt={2}
                          alignItems={isMobile ? "stretch" : "center"}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            fullWidth={isMobile}
                            onClick={() => navigate(`/applicant/${app.id}`)}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            fullWidth={isMobile}
                            onClick={() => handleAction(app.id, "accepted")}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            fullWidth={isMobile}
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
          <Typography
            textAlign="center"
            mt={2}
            fontSize={{ xs: "0.95rem", sm: "1rem" }}
          >
            No applications yet.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobApplicationsDialog;
