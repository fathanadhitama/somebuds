import UserImage from "./UserImage";
import FlexBetween from "./FlexBetween";
import { Box,IconButton,Typography } from "@mui/material";
import { PersonAddRounded, PersonRemoveRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const FriendInfo = ({friendId, name, subtitle, picturePath}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)
    const isFriend = friends.find((friend) => friend._id === friendId);
    const { palette } = useTheme()
    
    const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization :`Bearer ${token}`,
                    "Content-Type" : "application/json"
                }
            }
        )
        const data = await response.json()
        dispatch(setFriends({friends: data}))
    }

    return (
        <FlexBetween>
            <FlexBetween>
                <UserImage image={picturePath} size="50px"/>
                <Box
                onClick={() => {
                    navigate(`/profile/${friendId}`);
                }}
                p="0 1rem">
                    <Typography
                     fontWeight={500}
                     variant="h6"
                     sx={{"&:hover":{cursor: "pointer"}}}>{name}</Typography>
                    <Typography>{subtitle}</Typography>
                </Box>
            </FlexBetween>
            {_id === friendId ? null 
            : (<IconButton
            borderRadius="50%"
            sx={{
                "&:hover":{cursor:"pointer", backgroundColor:palette.primary.main, color:"white"}
            }}
            onClick={() => {
                patchFriend();
            }}>
                {isFriend ? <PersonRemoveRounded/> : <PersonAddRounded/>}
            </IconButton>)}
        </FlexBetween>
    )
}

export default FriendInfo