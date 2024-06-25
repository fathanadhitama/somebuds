import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import UserWidget from '../widgets/UserWidget'
import PostsWidget from '../widgets/PostsWidget';
import FriendlistWidget from '../widgets/FriendlistWidget';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token)
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { userId } = useParams()

  const getUser = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization : `Bearer ${token}`
        }
      }
    )
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  },[])

  if(!user) return null;  

  return (
    <Box>
      <Navbar/>
      <Box
      padding="2rem 6%"
      display={isNonMobile ? "flex" : "block"}
      gap="2rem"
      justifyContent="center"
      >
        {isNonMobile && (<Box flexBasis={isNonMobile ? "26%" : undefined}>
          <Box sx={{position: "sticky", top:"1rem"}}>
            <UserWidget userId={userId} picturePath={user.picturePath} isProfile={true}/>
            <Box m="2rem 0"></Box>
            <FriendlistWidget userId={userId}/>
          </Box>
        </Box>)}
        <Box flexBasis={isNonMobile ? "42%" : undefined}
        mt={isNonMobile ? undefined : "2rem"}
        sx={{border:"2.5px solid red", borderRadius:"0.5rem"}}
        >
            <Box sx={{backgroundColor:"rgba(255, 255, 255, 0.6)", backdropFilter:"blur(5px)",
                      position:"sticky", top:"0px"}}>
              <Typography fontWeight="600" variant='h5' p="1rem">{user.firstName}'s Posts</Typography>
            </Box>
            <PostsWidget userId={userId} isProfile/>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage