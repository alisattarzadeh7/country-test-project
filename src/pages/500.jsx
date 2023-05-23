import Image from "next/image";
import serverErrorImage from "~/src/assets/images/serverError.svg"
import {Box} from "@mui/material";
function Error({ statusCode }) {
    return (
    <div className="w-full h-full  flex flex-col items-center">
        <div className="relative w-full h-[50%] "><Image src={serverErrorImage} fill alt="server error icon" /></div>
        <Box mt={10}>An error occurred on server</Box>
    </div>
    );
}


export default Error;