import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import {format} from 'timeago.js'

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [posts,setMyPosts]=useState([]);

  const getPosts = async () => {
    try{
      const response = await fetch("https://apni-duniya-social.vercel.app/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        // mode: 'no-cors',
      });
      const data = await response.json();
      // console.log(data)
      setMyPosts(data);
      dispatch(setPosts({ posts: data }));
    }catch(err){
      console.log(err);
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://apni-duniya-social.vercel.app/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setMyPosts(data);
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          createdAt,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            createdAt={format(createdAt)}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
