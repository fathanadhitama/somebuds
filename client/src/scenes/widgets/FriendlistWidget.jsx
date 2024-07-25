import WidgetWrapper from "../../components/WidgetWrapper";
import { Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FriendInfo from "../../components/FriendInfo";
import { setFriends } from "../../state";
import { useEffect } from "react";

const FriendlistWidget = ({userId}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {
        const response = await fetch(
           `${process.env.REACT_APP_API_URL}/users/${userId}/friends`,
           {
            method:"GET",
            headers: { Authorization: `Bearer ${token}`}
           }
        )
        const data = await response.json()

        dispatch(setFriends({friends: data}))
    }

    useEffect(() => {
        getFriends()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <WidgetWrapper>
            <Typography variant="h5" fontWeight="600">
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem" mt="1.5rem">
                {friends.map((friend, index) => (
                        <FriendInfo
                            key={index}
                            friendId={friend._id}
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.occupation}
                            picturePath={friend.picturePath}
                        />
                    ))
                }
            </Box>
        </WidgetWrapper>
    )
}

export default FriendlistWidget