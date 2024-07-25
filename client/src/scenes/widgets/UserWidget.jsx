import { Box, Typography, Divider } from "@mui/material";
import {EditOutlined, LocationOnOutlined,WorkOutlineOutlined, ManageAccountsOutlined } from "@mui/icons-material"
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const UserWidget = ({userId, picturePath, isProfile=false}) => {
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token)
    const navigate = useNavigate();
    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium

    const getUser = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/${userId}`,
            {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(!user) return null;

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;


    return (
        <WidgetWrapper>
            {/* FIRST ROW : User Detail*/}
            <FlexBetween
                mb="10px"
                onClick={() => navigate(`/profile/${userId}`)}
                borderRadius="1rem"
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath}/>
                    <Box>
                        <Typography
                        color={dark}
                        fontWeight="600"
                        sx={{
                            "&:hover": {
                                color: palette.primary.dark,
                                cursor: "pointer",
                            },
                        }}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                {!isProfile && <ManageAccountsOutlined/>}
            </FlexBetween>
                
            <Divider/>

            {/** SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined/>
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <WorkOutlineOutlined/>
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider/>
            {/** THIRD ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile?</Typography>
                    <Typography color={medium} fontWeight="600">{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Impression of your posts</Typography>
                    <Typography color={medium} fontWeight="600">{impressions}</Typography>
                </FlexBetween>
            </Box>

            <Divider/>
            {/** FOURTH ROW */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={dark} fontWeight="600" mb="1rem">
                    Social Profiles
                </Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={dark} fontWeight="600">Twitter</Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined/>
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={dark} fontWeight="600">Linkedin</Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{color: dark}}/>
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    )
}

export default UserWidget