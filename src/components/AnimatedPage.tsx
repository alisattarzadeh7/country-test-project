import React, {ReactNode} from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 50,
    },
    in: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
        },
    },
    out: {
        opacity: 0,
        y: 50,
        transition: {
            duration: 0.2,
        },
    },
};

interface IAnimatedPageProps{
    children:ReactNode
}

const AnimatedPage:React.FC<IAnimatedPageProps> = ({ children,...props }) =>{
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="h-full w-full"
            {...props}
        >
            { children }
        </motion.div>
    );
}

export default AnimatedPage;