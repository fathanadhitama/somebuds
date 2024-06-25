import React from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../widgets/PostsWidget';
import AdvertWidget from '../widgets/AdvertWidget';
import FriendlistWidget from '../widgets/FriendlistWidget';
import Navbar from '../navbar/Navbar';

function Homepage() {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const {_id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar/>
      <Box
      padding="2rem 6%"
      display={isNonMobile ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
      >
        {isNonMobile && (<Box flexBasis={isNonMobile ? "26%" : undefined}>
          <Box sx={{position: "sticky", top:"6rem"}}>
            <UserWidget userId={_id} picturePath={picturePath}/>
          </Box>
        </Box>)}
        <Box flexBasis={isNonMobile ? "42%" : undefined}
        mt={isNonMobile ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath}/>
          <PostsWidget userId={_id}/>
        </Box>
        {isNonMobile && (
          <Box flexBasis="26%">
            <Box sx={{position: "sticky", top:"6rem"}}>
              <AdvertWidget/>
              <Box m="1rem 0"/>
              <FriendlistWidget userId={_id}/>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Homepage