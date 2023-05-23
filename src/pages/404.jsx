import Image from "next/image";
import notFoundPage from "~/src/assets/images/notFoundPage.svg"
import {Box} from "@mui/material";
export default function Custom404() {
    return (    <div className="w-full h-full  flex flex-col items-center">
        <div className="relative w-full h-[50%] "><Image src={notFoundPage} fill alt="server error icon" /></div>
    </div>);
}