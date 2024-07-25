import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from "@mui/icons-material"
import { Box,Divider,Typography,InputBase,Button,IconButton,useMediaQuery } from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import Dropzone from "react-dropzone"
import UserImage from "../../components/UserImage"
import WidgetWrapper from "../../components/WidgetWrapper"
import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { setPosts } from "../../state"
import { useTheme } from "@emotion/react"

const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null)
    const [post, setPost] = useState("")
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const isNonMobile = useMediaQuery("(min-width:1000px)")
    const { palette } = useTheme()
    const medium = palette.neutral.medium

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if(image){
            formData.append("picture", image)
            formData.append("picturePath", image.name)
        }

        const response = await fetch(
                "http://localhost:3001/posts",
                {
                    method:"POST",
                    headers: { Authorization: `Bearer ${token}`},
                    body: formData,
                }
            )

        const posts = await response.json()
        dispatch(setPosts({ posts }))
        setImage(null)
        setPost("")
    }
    
    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath}/>
                <InputBase
                p="1rem 2rem"
                onChange={(e) => setPost(e.target.value)}
                value={post}
                placeholder="What do you want to grumble about?"
                sx={{
                    width:"100%",
                    p:"1rem 2rem",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "1rem"
                }}/>
            </FlexBetween>
            {isImage && (<Box
            p="1rem"
            mt="1rem"
            borderRadius="5px"
            border="1px solid"
            borderColor={palette.primary.main}
            >
                <Dropzone
                acceptedFiles=".jpg, .jpeg, .png"
                multiple={false}
                onDrop={(acceptedFiles) => 
                    setImage(acceptedFiles[0])
                }
                >
                    {({ getRootProps, getInputProps}) => (
                        <FlexBetween>         
                            <Box
                            {...getRootProps()}
                            border="2px dashed"
                            borderColor={palette.primary.main}
                            p="1rem"
                            width="100%"
                            sx={{ "&:hover": { cursor: "pointer"}}}>
                                <input {...getInputProps()}/>
                                {!image ? (
                                    <p>Add picture here</p>
                                ) : (
                                    <FlexBetween>
                                        <Typography>{image.name}</Typography>
                                        <EditOutlined/>
                                    </FlexBetween>
                                )}
                            </Box>
                            {image && (
                                <IconButton
                                onClick={() => setImage(null)}
                                sx={{width:"15%"}}>
                                    <DeleteOutlined/>
                                </IconButton>
                            )}
                        </FlexBetween>
                    )}
                </Dropzone>
            </Box>)}

            <Divider sx={{m: "1.25rem 0"}}/>

            {/** Attachments button */}
            <FlexBetween gap="1.5rem">
                <FlexBetween
                p="0.5rem"
                borderRadius="1rem"
                sx={{"&:hover": {cursor: "pointer",backgroundColor:palette.neutral.light}}}
                onClick={() => setIsImage(!isImage)}
                >
                    <ImageOutlined/>
                    <Typography p="0 0.2rem">
                        Image
                    </Typography>
                </FlexBetween>

                {isNonMobile ? (
                    <>
                    <FlexBetween
                    p="0.5rem"
                    borderRadius="1rem"
                    sx={{"&:hover": {cursor: "pointer",backgroundColor:palette.neutral.light}}}>
                        <GifBoxOutlined/>
                        <Typography p="0 0.2rem">
                            Clip
                        </Typography>
                    </FlexBetween>
                    <FlexBetween
                    p="0.5rem"
                    borderRadius="1rem"
                    sx={{"&:hover": {cursor: "pointer",backgroundColor:palette.neutral.light}}}>
                        <AttachFileOutlined/>
                        <Typography p="0 0.2rem">
                            Attachment
                        </Typography>
                    </FlexBetween>
                    <FlexBetween
                    p="0.5rem"
                    borderRadius="1rem"
                    sx={{"&:hover": {cursor: "pointer",backgroundColor:palette.neutral.light}}}>
                        <MicOutlined/>
                        <Typography p="0 0.2rem">
                            Audio
                        </Typography>
                    </FlexBetween>
                    </>
                ) : (
                    <FlexBetween
                    p="0.5rem"
                    borderRadius="1rem"
                    sx={{"&:hover": {cursor: "pointer",backgroundColor:palette.neutral.light}}}>
                        <MoreHorizOutlined sx={{color: medium}}/>
                    </FlexBetween>
                )}
                
                <Button
                disabled={!post}
                onClick={handlePost}
                sx={{
                    p: "0.5rem",
                    backgroundColor: palette.primary.main,
                    color: "white",
                    "&:hover": {backgroundColor: "#B3001B", boxShadow:"0px 0px 5px 1px black"},
                    borderRadius:"2rem"
                }}>
                    POST 
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default MyPostWidget