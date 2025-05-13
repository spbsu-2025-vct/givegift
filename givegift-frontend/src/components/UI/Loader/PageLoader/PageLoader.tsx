import { Box, CircularProgress } from "@mui/material"

export const PageLoader = () => {
  return <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress color="inherit" size="3rem" />
  </Box>
};