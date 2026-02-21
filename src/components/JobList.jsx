import { Stack } from "@mui/material";
import JobCard from "./JobCard";

function JobList({ jobs }) {
  return (
    <Stack spacing={3}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Stack>
  );
}

export default JobList;
