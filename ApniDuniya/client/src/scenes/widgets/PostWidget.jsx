import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { RWebShare } from "react-web-share";

import {Button} from '@mui/material';
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from '@mui/material/CircularProgress';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  createdAt,
  location,
  picturePath,
  userPicturePath,
  likes,
  // comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const user= useSelector((state) => state.user);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [like, setLike] = useState(Object.keys(likes).length);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [text,setText]=useState('');

  const deleteAccess = (loggedInUserId === postUserId) || user.isAdmin;

  useEffect(() => {
    setIsLiked(likes[loggedInUserId]);
  }, [loggedInUserId, likes]);

  const patchLike = async () => {
    try{
      const response = await fetch(`https://apni-duniya-social.vercel.app/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    } catch(err){
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };  

  const deletePost = async (id) => {
    try{
      setLoading(true);
      const response = await fetch(`https://apni-duniya-social.vercel.app/posts${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setLoading(false);  
      window.location.reload();
    } catch(err){
      console.log(err);
    }
  }  

  // useEffect(() => {
    // deletePost();
  // },[])
  
  const getComments = async () => {
    try{
      const response = await fetch(`https://apni-duniya-social.vercel.app/comments/${postId}/comments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }); 
      const cmt = await response.json();
      setComments(cmt);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getComments();
  },[comments])


  const addComment = async () => {
    try{
      const response = await fetch(`https://apni-duniya-social.vercel.app/comments/${postId}/comments`, {
        method: "POST",
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({comment:text}),
      });
      const cmt = await response.json();
    }catch(err){
      console.log(err);
    } 
  }

  const handleComment= async (e) => {
    e.preventDefault();
    addComment();
    setText('');
    console.log("new comment is added");
  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={createdAt}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.5rem", marginTop: "0.75rem"}}
          src={picturePath ? picturePath : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfM0aJHdAY3DIDcz5FjsL3B2ZZjrSNzh-z6w&usqp=CAU"}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{like}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
          
        {deleteAccess && 
          <IconButton onClick={()=>deletePost(`/${postId}`)}>
            {!loading ? <DeleteIcon /> : <CircularProgress />}
          </IconButton>
        }    
      </FlexBetween>
      
      {isComments &&
        <div>
          
          <form onSubmit={handleComment} style={{display:'flex'}}>
            <input type="text" onChange={(e)=>setText(e.target.value)} value={text} placeholder="Add a comment" style={{color:'grey',width:'100%',marginLeft:'5px',padding:'5px',outline:'none',border:'none',border:'1px solid #999',borderRadius:'6px',paddingLeft:'10px',fontFamily:"'candara',sans-serif",fontSize:'20px',background:'none'}} />
            <Button type="submit" style={{backgroundColor:'black',color:'primary',margin:'0px 4px'}}>Add</Button>
          </form>

          <Box mt="0.5rem">
            {comments.map((comment) => (
              <Box key={comment._id}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  <b style={{fontSize:'15px',textTransform:'capitalize',color:'#999'}}>{comment.name ? comment.name : "unknown"} : </b>{comment.comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>

        </div>
      }
    </WidgetWrapper>
  );
};

export default PostWidget;
