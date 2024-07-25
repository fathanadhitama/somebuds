import { useDispatch,useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { useEffect } from "react";
import { Box } from "@mui/material";

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        try {
            const response = await fetch(
                    `http://localhost:3001/posts`,
                    {
                        method: "GET",
                        headers:{Authorization: `Bearer ${token}`}
                    }
                )
            const data = await response.json()
            if (data.error) {
                throw new Error("JWT Malformed")
            }
            dispatch(setPosts({posts: data}))
        } catch (error) {
            console.error(error)
        }
    }

    const getUserPosts = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/posts/${userId}/posts`,
                {
                    method: "GET",
                    headers:{Authorization: `Bearer ${token}`} 
                }
            )
            const data = await response.json();
            if (data.error) {
                throw new Error("JWT Malformed")
            }
            dispatch(setPosts({posts: data}))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    }, [])

    return (
        <Box display="flex" flexDirection="column-reverse">
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    firstName={firstName}
                    lastName={lastName}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                    />
            )
            )}
        </Box>
    )
}

export default PostsWidget;
