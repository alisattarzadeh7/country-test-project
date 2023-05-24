import React from "react";
import {motion, MotionProps} from "framer-motion";
import Typography from "@mui/material/Typography";


type ITitleValueRowProps = {
    title: string,
    value: string | number,
} & MotionProps



const variantAnimate = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    show: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: 10,
    }
}

const TitleValueRow: React.FC<ITitleValueRowProps> = ({title, value, ...props}) => {
    return (<>
        <motion.div key={title} variants={variantAnimate} className="bold capitalize text-sm flex items-center" {...props}><Typography
            color="text.primary" component="span">{title}:</Typography>&nbsp;<Typography color="text.primary" fontSize={12} className="opacity-50">{value}</Typography></motion.div>
    </>)
}


export default TitleValueRow