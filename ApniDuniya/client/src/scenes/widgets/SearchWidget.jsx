// import React, { useState } from 'react'
// import WidgetWrapper from "components/WidgetWrapper";
// import Navbar from 'scenes/navbar';
// import { Box } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import Friend from 'components/Friend';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setFriends } from 'state';
// import { useTheme } from '@mui/material/styles';
// import { palette } from '@mui/system';
// import { useLocation } from 'react-router-dom';


// const SearchWidget = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const firstName = query.get('firstName');
//   const token=useSelector(state=>state.token);
//   const [results,setResults]=useState([]);

//   const getSerachedUser= async () => {
//     try{
//       const response = await fetch(`https://apni-duniya-social.vercel.app/users/find/me?firstName=${firstName}`,{
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       console.log(data);
//       setResults(data);
//     }catch(err){
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     getSerachedUser();
//   },)

//   console.log(results)

//   return (
//     <div className='search'>
//       <Navbar />
//       <div className='Results' style={{height:'100vh',width:'100%',display:'flex',border:'2px solid red',justifyContent:'center'}}>
//           <div className='userCard' style={{display:'flex',alignItems:'center',flexDirection:'row',border:'1px solid red', height:'fit-content',padding:'8px',margin:'30px'}}>
            
//             <div className='userImage' style={{}}>
//               <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAn8tEU1Jag0WcLaHcdxaBLxLClw-zArNvg&usqp=CAU' height='100px' style={{borderRadius:'50%',border:'1px solid grey'}} alt='img' />
//             </div>

//             <div className='userDetails' style={{border:'1px solid red',margin:'10px',padding:'5px',fontFamily:"'candara',sans-serif",textTransform:'capitalize'}}>
//               <Typography variant='h5' fontWeight='200' sx={{mb:'.5rem'}}>UserName:-{results.firstName} {results.lastName}</Typography>
//               <Typography variant='h6' fontWeight='200' sx={{mb:'.1rem'}}>Occupation:-{results.occupation}</Typography>
//               <Typography variant='h6' fontWeight='200' sx={{mb:'.1rem'}}>Contact:-{results.email}</Typography>
//               <Typography variant='h6' fontWeight='200' sx={{mb:'.1rem'}}>Location:-{results.location}</Typography>
//               <Typography variant='h3' fontWeight='200' sx={{mb:'.1rem'}}>Bio:-{}</Typography>
//             </div>

//           </div>
//       </div>
//     </div>
//   )
// }

// export default SearchWidget
