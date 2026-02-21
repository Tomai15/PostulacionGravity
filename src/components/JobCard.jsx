import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { applyToJob } from "../services/api";
import {CANDIDATE_UUID, CANDIDATE_ID, APPLICATION_ID} from "../config/candidate";

function JobCard({ job }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await applyToJob({
        uuid: CANDIDATE_UUID,
        candidateId: CANDIDATE_ID,
          applicationId: APPLICATION_ID ,
        jobId: job.id,
        repoUrl,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {job.title}
        </Typography>
        <TextField
          label="GitHub Repository URL"
          placeholder="https://github.com/your-user/your-repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          fullWidth
          size="small"
          disabled={loading || success}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Application submitted successfully!
          </Alert>
        )}
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!repoUrl.trim() || loading || success}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default JobCard;
