import React from 'react'
import Form from './Form';
import { Box, Typography, useMediaQuery } from '@mui/material'

function LoginPage() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box sx={{display:'flex', justifyContent: 'center', alignItems:'center', minHeight:'100dvh'}}> 
      {/* <Box
        width="100%"
        backgroundColor="#B3001B"
        p="1rem 6%"
        textAlign="center"
        boxShadow={20}
        boxSizing="border-box"
        borderRadius="0 0 15px 15px"
      >
        <Typography 
          fontWeight="Bold"
          color="White"
          fontSize="32px">
          SomeBuds
        </Typography>
      </Box> */}

      <Box
      width={isNonMobileScreens? "50%" : "93%"}
      p="2rem"
      margin="auto"
      // border="2px solid #B3001B"
      borderRadius="1.5rem"
      backgroundColor="white"
      boxShadow="0 0 100px 1px #B3001B"
      boxSizing="border-box">
        <Typography textAlign={'center'} color={'#B3001B'} fontSize={40} fontWeight={'bold'}>
          Somebuds
        </Typography>
        <Typography textAlign={'center'} color={'#B3001B'} fontSize={20} mb={3}>
          Welcome Back
        </Typography>
        <Form/>
      </Box>
    </Box>
  )
}

export default LoginPage