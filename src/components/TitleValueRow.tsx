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
        <motion.div key={title} variants={variantAnimate} className="bold capitalize text-sm" {...props}><Typography
            color="text.primary" component="span">{title}:</Typography>&nbsp;<span className="opacity-50">{value}</span></motion.div>
    </>)
}


export default TitleValueRow