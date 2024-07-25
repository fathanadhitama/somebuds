import React from 'react'
import { useState } from 'react';
import UserImage from '../../components/UserImage';
import { useDispatch, useSelector } from 'react-redux';
import FlexBetween from '../../components/FlexBetween';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
  Person,
  ExitToAppOutlined
} from "@mui/icons-material";
import { setMode, setLogout } from '../../state';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const theme = useTheme()
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const fullName = `${user.firstName} ${user.lastName}`;
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const medium = theme.palette.neutral.medium;
  const alt = theme.palette.background.alt;
  const primaryLight = theme.palette.primary.light;
  const main = theme.palette.primary.main

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt} color="white" borderRadius="0 0 0.5rem 0.5rem"
    sx={{position:"sticky", top:"0", zIndex:"99"}}>
      <FlexBetween gap="1.75rem">
        <Typography
        onClick={() => navigate('/home')}
        color={'primary'}
        fontSize="2rem"
        fontWeight='bold'
        sx={{"&:hover": {cursor: 'pointer', color: primaryLight}}}
        >
          SomeBuds
        </Typography>
        {isNonMobile && (
          <FlexBetween
          borderRadius="0.5rem"
          backgroundColor={neutralLight}
          padding="0.1rem 1.5rem"
          >
            <InputBase placeholder='Search...' color={'white'}/>
            <IconButton>
              <Search/>
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP */}
      {isNonMobile ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px", color: theme.palette.mode === "dark" ? 'white' : dark }} />
          <Notifications sx={{ fontSize: "25px", color: theme.palette.mode === "dark" ? 'white' : dark  }} />
          <Help sx={{ fontSize: "25px", color: theme.palette.mode === "dark" ? 'white' : dark  }} />
          <FormControl variant='standard' value={fullName}>
            <Select
            value={fullName}
            input={<InputBase />}
            sx={{
              backgroundColor: neutralLight,
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem ",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutralLight,
              },
            }}
>
              <MenuItem value={fullName} onClick={() => navigate(`/profile/${user._id}`)}>
                <Box display="flex">
                  <Person/>
                  <Typography>{fullName}</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                <Box display="flex" gap="0.5rem" color="red">
                  <ExitToAppOutlined/>
                  <Typography>Log Out</Typography>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu sx={{color:main}}/>
        </IconButton>
      )}
      
      

      {/* MOBILE NAV */}
      {!isNonMobile && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          top="0"
          height="100%"
          zIndex="99"
          width="100%"
          maxWidth="700px"
          backgroundColor={main}
        >
          {/* CLOSE ITEM */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close sx={{color:"white"}}/>
            </IconButton>
          </Box>

          {/* USER PROFILE */}
          <Box backgroundColor={alt} display="flex" flexDirection="column" alignItems="center"
          gap="1rem" pt={5}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill={main} fill-opacity="1" d="M0,96L80,80C160,64,320,32,480,64C640,96,800,192,960,202.7C1120,213,1280,139,1360,101.3L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}
            <UserImage image={user.picturePath} size='120px'/>
            <Typography color={medium} variant='h5' fontWeight='bold'>{fullName}</Typography>
            <Typography color={medium}>{user.occupation}</Typography>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill={main} fill-opacity="1" d="M0,96L80,80C160,64,320,32,480,64C640,96,800,192,960,202.7C1120,213,1280,139,1360,101.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
          </Box>

          {/* MENU ITEMS */}
          <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="2rem">
            <Box p="0.2rem" display="flex" alignItems="center" gap="0.5rem"
            onClick={() => dispatch(setMode())}>
              <IconButton>
                <LightMode sx={{fontSize:"25px", color:"white"}}/>
              </IconButton>
              <Typography>Change Mode</Typography>
            </Box>
            <Box p="0.2rem" display="flex" alignItems="center" gap="0.5rem"
            onClick={() => navigate(`/profile/${user._id}`)}>
              <Person/>
              <Typography>Profile</Typography>
            </Box>
            <Box p="0.2rem" display="flex" alignItems="center" gap="0.5rem"
            onClick={() => dispatch(setLogout())}>
              <ExitToAppOutlined sx={{fontSize:"25px"}}/>
              <Typography>Logout</Typography>
            </Box>
          </Box>

        </Box>
      )}

    </FlexBetween>
  )
}

export default Navbar