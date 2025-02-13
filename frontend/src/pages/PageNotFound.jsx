import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" marginBottom={2}>
        Sorry, the page you visited does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Back to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
