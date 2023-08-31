import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary" style={{color:'rgb(244, 51, 151)'}} fontFamily={"'Dancing Script', cursive"}>
          Apni Duniya
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="400" variant="h6" sx={{ mb: "1.5rem" }} fontFamily={
          "'Dancing Script', cursive"
        }>
          Welcome to Apni Duniya, the Social Media for All!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
