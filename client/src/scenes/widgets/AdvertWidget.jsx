import WidgetWrapper from "../../components/WidgetWrapper";
import FlexBetween from "../../components/FlexBetween";
import { Typography } from "@mui/material";

const AdvertWidget = () => {
    return (
        <WidgetWrapper sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <FlexBetween>
                <Typography fontWeight="600">Sponsored</Typography>
                <Typography color="GrayText" sx={{"&:hover":{cursor:"pointer"}}}>Create Ad</Typography>
            </FlexBetween>
            <img src="https://source.unsplash.com/random/300x300" alt="Advertisement"
            style={{borderRadius: "0.5rem", margin:"1rem 0"}}/>
            <FlexBetween>
                <Typography fontWeight="600">Brand Name</Typography>
                <Typography color="GrayText" sx={{"&:hover":{cursor:"pointer"}}}>brandwebsite.com</Typography>
            </FlexBetween>
            <Typography>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique facere atque, incidunt eveniet ex praesentium.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget