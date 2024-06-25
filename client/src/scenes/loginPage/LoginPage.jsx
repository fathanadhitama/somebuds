import React from 'react'
import Form from './Form';
import { Box, Typography, useMediaQuery } from '@mui/material'

function LoginPage() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box> 
      <Box
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
      </Box>

      <Box
      width={isNonMobileScreens? "50%" : "93%"}
      p="2rem"
      margin="2rem auto"
      border="2px solid #B3001B"
      borderRadius="1.5rem"
      backgroundColor="white"
      boxShadow="0 0 20px 1px black"
      boxSizing="border-box">
        <Form/>
      </Box>
    </Box>
  )
}

export default LoginPage