import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material"
import { 
    Box,
    Divider,
    Typography,
    IconButton,
} from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import FriendInfo from "../../components/FriendInfo"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { setPost } from "../../state"

const PostWidget = ({
    postId,
    postUserId,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false)
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token)
    const loggedInUserId = useSelector((state) => state.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length

    const patchLike = async () => {
        const response = await fetch(
            `http://localhost:3001/posts/${postId}/like`,
            {
                method: "PATCH",
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userId: loggedInUserId})
            }
        )
        const updatedPost = await response.json();
        dispatch(setPost({post_id:postId, post:updatedPost})) 
    }

    return (
        <WidgetWrapper mt="1rem">
            <FriendInfo 
            friendId={postUserId}
            name={`${firstName} ${lastName}`}
            subtitle={location}
            picturePath={userPicturePath}
            />
            <Typography sx={{mt:"1rem"}}>{description}</Typography>
            {picturePath && (
                <img 
                    width="100%"
                    height="auto"
                    alt="image"
                    style={{borderRadius:"0.5rem", marginTop: "0.75rem"}}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    {/** LIKE */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined/>
                            ) : (
                                <FavoriteBorderOutlined/>
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    {/** COMMENTS */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={()=> setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined/>
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton>
                    <ShareOutlined/>
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${firstName}-${i}`}>
                            <Divider/>
                            <Typography sx={{m: "0.5rem 0", pl:"1rem"}}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </WidgetWrapper>
    )
}

export default PostWidget