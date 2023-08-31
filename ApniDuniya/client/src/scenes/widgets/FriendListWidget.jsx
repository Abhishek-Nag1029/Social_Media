import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `https://apni-duniya-social.vercel.app/users/${userId}/friends`,
      {
        method: "GET",
        // mode: "no-cors",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    dispatch(setFriends({ friends: data }));
  };
  
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(friends)

  return (
    <WidgetWrapper sx={{
      height: 'fit-content',
      '@media (min-width: 1050px)': {
        position: 'sticky',
        top: '100px',
        scrollBehavior: 'smooth',
      },
    }} >
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem",fontFamily:'monospace',fontWeight:'bold',fontSize:'1.6rem' }}
      >
        Friend List({friends?.length})
      </Typography>
      {friends?.length>0 ? <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box> :
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem",fontFamily:'candara,"sans-serif"' }}
        >
          No Friends to Show.<br/>
        </Typography>
      </Box>}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
