import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme,IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {RWebShare} from 'react-web-share'

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`https://apni-duniya-social.vercel.app/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    profilePicture,
    viewedProfile,
    impressions,
    friends,
  } = user;

  const shareUrl=`https://apni-duniya.vercel.app/profile/${userId}`

  return (
    <WidgetWrapper>  
    {/* style={{position:'fixed'}} */}
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} onClick={() => navigate(`/profile/${userId}`)} />
          <Box onClick={() => navigate(`/profile/${userId}`)}>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",
                fontFamily:"candara,'sans-serif'",

                "&:hover": {
                  color:'grey',
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium} sx={{fontFamily:"monospace"}}>{friends?.length} friends</Typography>
          </Box>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <RWebShare data={{text: "Web Share - GfG",url:shareUrl,title: "GfG",}} onClick={() => console.log("shared successfully!")}>
            <IconButton>
              <ShareOutlined />
            </IconButton>
          </RWebShare>
        </FlexBetween>

      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color='blue' fontSize='15px' fontWeight={'bold'} sx={{fontFamily:"candara,'sans-serif'"}}>Lives in {location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color='red' fontSize='15px' fontWeight={'bold'} sx={{fontFamily:"candara,'sans-serif'"}}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
            <Typography color='secondary' fontWeight="bolder">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>

              <Typography color='secondary' fontWeight="bolder">
                Linkedin
              </Typography>

              <Typography color={medium}>
                Network Platform
              </Typography>

            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
