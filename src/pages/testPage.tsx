import {NextPage} from "next";
import {Box, Button, Grid, useTheme} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useRouter} from "next/router";
import AnimatedPage from "~/components/AnimatedPage";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import serverErrorImage from "~/src/assets/images/serverError.svg"
import styles from "./countryDetail.module.scss"
import Link from "next/link";
import {motion, MotionProps} from "framer-motion"
import React from "react";


type ITitleValueRowProps = {
    title:string
} & MotionProps


const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            type:'tween'
        }
    }
};


const variantAnimate = {
    hidden:{
        opacity:0,
        y:10,
    },
    show:{
        opacity:1,
        y:0,
    },
    exit:{
        opacity:0,
        y:10,
    }
}


const borderBtnAnimate = {
    hidden:{
        opacity:0,
        x:10,
    },
    show:{
        opacity:1,
        x:0,
    },
    exit:{
        opacity:0,
        x:10,
    }
}

const TitleValueRow:React.FC<ITitleValueRowProps> = ({title,...props})=>{
    return (<>
        <motion.div  key={title} variants={variantAnimate} className={styles.detailTitle} {...props}><Typography color="text.primary" component="span">{title}:</Typography> </motion.div>
        </>)
}


const TestPage: NextPage = () => {
    const router = useRouter()
    const theme = useTheme()
    const handleGetBack = () => {
        router.replace('/')
    }

    return (<motion.div variants={container} initial="hidden" animate="show" exit="exit">

        <Box mt={2}>
            <Button variant="outlined" onClick={handleGetBack}
                    startIcon={<KeyboardBackspaceIcon style={{color:theme.palette.text.primary}}  />}>
                <Typography color="text.primary" fontSize={15} component="span" className="capitalize">back</Typography>
            </Button>
            <Grid container height={400} mt={3}>
                <Grid item xs={12} lg={5}>
                    <motion.div initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}}
                                transition={{delay: 0.3, type: 'tween'}} className={styles.imageContainer} ><Image
                        src="https://flagcdn.com/w320/ch.png" fill  alt="logo image"/></motion.div>
                </Grid>
                <Grid item xs={12} lg={7} px={10} py={5} container>
                    <Grid xs={12} item py={3}><Typography color="text.primary" component="span"  fontSize={30}
                                                          fontWeight="bolder">Title</Typography></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow  title="native name"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow  title="top level domain"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow  title="population"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow  title="currencies"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow  title="region"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow  title="languages"/></Grid>
                    <Grid item xs={12} ><TitleValueRow  title="sub region"/></Grid>
                    <Grid item xs={12} ><TitleValueRow  title="capital"/></Grid>
                    <Grid item xs={12} container alignItems="center">
                        <Grid item>
                            <Typography component="h1" fontSize={17} fontWeight="bold" color="text.primary">Border Countries: </Typography>
                        </Grid>
                        <Grid  item >
                            <Grid container>
                                <motion.div variants={borderBtnAnimate} className="px-1">
                                    <Link href={`/country/${123}`}>
                                        <Button sx={{
                                            height: 25,
                                            boxShadow:'unset'
                                        }} variant="outlined">
                                            <Typography color="text.primary" component="span" className={styles.borderCountryStyle}>back</Typography>
                                        </Button>
                                    </Link>
                                </motion.div>
                                <motion.div variants={borderBtnAnimate} className="px-1">
                                    <Link href={`/country/${123}`}>
                                        <Button sx={{
                                            height: 25,
                                            boxShadow:'unset'
                                        }} variant="outlined">
                                            <Typography color="text.primary" component="span" className={styles.borderCountryStyle}>back</Typography>
                                        </Button>
                                    </Link>
                                </motion.div>
                                <motion.div variants={borderBtnAnimate} className="px-1">
                                    <Link href={`/country/${123}`}>
                                        <Button sx={{
                                            height: 25,
                                            boxShadow:'unset'
                                        }} variant="outlined">
                                            <Typography color="text.primary" component="span" className={styles.borderCountryStyle}>back</Typography>
                                        </Button>
                                    </Link>
                                </motion.div>
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        </Box>
    </motion.div>)
}

export default TestPage