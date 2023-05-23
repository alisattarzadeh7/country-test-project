import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import CountryController from "~/src/Utils/Controllers/CountryController";
import qs from "qs";
import Country from "~/src/Utils/Entities/Country";
import {useRouter} from "next/router";
import {Box, Button, Grid, useTheme} from "@mui/material";
import {motion, MotionProps} from "framer-motion";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Typography from "@mui/material/Typography";
import styles from "~/src/pages/country/countryDetail.module.scss";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TitleValueRow from "~/components/TitleValueRow";

interface ICountryDetailProps {
    country: Country
}



const container = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            type: 'tween'
        }
    }
};




const borderBtnAnimate = {
    hidden: {
        opacity: 0,
        x: 10,
    },
    show: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: 10,
    }
}



const CountryDetail: NextPage<ICountryDetailProps> = ({country}) => {
    const router = useRouter()
    const theme = useTheme()
    const handleGetBack = () => {
        router.back()
    }

    return (<motion.div variants={container} initial="hidden" animate="show" exit="exit">

        {
            country &&
            <Box mt={2}>
            <Button variant="outlined" onClick={handleGetBack}
                    startIcon={<KeyboardBackspaceIcon style={{color: theme.palette.text.primary}}/>}>
                <Typography color="text.primary" fontSize={15} component="span" className="capitalize">back</Typography>
            </Button>
            <Grid container height={400} mt={3}>
                <Grid item xs={12} lg={5}>
                    <motion.div initial={{opacity: 0, x: 100}} animate={{opacity: 1, x: 0}}
                                transition={{delay: 0.3, type: 'tween'}} className={styles.imageContainer}><Image
                        src={country.flags.svg} fill alt={country.flags.alt}/></motion.div>
                </Grid>
                <Grid item xs={12} lg={7} px={10} py={5} container>
                    <Grid xs={12} item py={3}><Typography color="text.primary" component="span" fontSize={30}
                                                          fontWeight="bolder">Title</Typography></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow
                        value={Object.keys(country.name.nativeName)[0] ? country.name.nativeName?.[Object.keys(country.name.nativeName)[0] as string]?.official : ''}
                        title="native name"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow value={country.tld?.join(', ')} title="top level domain"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow value={country.population} title="population"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow value={Object.keys(country.currencies).join(', ')} title="currencies"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow value={country.region} title="region"/></Grid>
                    <Grid item xs={12} lg={6}><TitleValueRow value={Object.values(country.languages).join(', ')} title="languages"/></Grid>
                    <Grid item xs={12}><TitleValueRow value={country.subregion} title="sub region"/></Grid>
                    <Grid item xs={12}><TitleValueRow value={country.capital?.join(', ')} title="capital"/></Grid>
                    {
                        country?.borders?.length > 0 &&
                        <Grid item xs={12} container alignItems="center">
                            <Grid item>
                                <Typography component="h1" fontSize={17} fontWeight="bold" color="text.primary">Border
                                    Countries: </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    {
                                        country?.borders.map(border => <motion.div variants={borderBtnAnimate}
                                                                                   className="px-1">
                                            <Link href={`/country/${border}`}>
                                                <Button sx={{
                                                    height: 25,
                                                    boxShadow: 'unset'
                                                }} variant="outlined">
                                                    <Typography color="text.primary" component="span"
                                                                className={styles.borderCountryStyle}>{border}</Typography>
                                                </Button>
                                            </Link>
                                        </motion.div>)
                                    }

                                    {/*<motion.div variants={borderBtnAnimate} className="px-1">*/}
                                    {/*    <Link href={`/country/${123}`}>*/}
                                    {/*        <Button sx={{*/}
                                    {/*            height: 25,*/}
                                    {/*            boxShadow:'unset'*/}
                                    {/*        }} variant="outlined">*/}
                                    {/*            <Typography color="text.primary" component="span" className={styles.borderCountryStyle}>back</Typography>*/}
                                    {/*        </Button>*/}
                                    {/*    </Link>*/}
                                    {/*</motion.div>*/}
                                    {/*<motion.div variants={borderBtnAnimate} className="px-1">*/}
                                    {/*    <Link href={`/country/${123}`}>*/}
                                    {/*        <Button sx={{*/}
                                    {/*            height: 25,*/}
                                    {/*            boxShadow:'unset'*/}
                                    {/*        }} variant="outlined">*/}
                                    {/*            <Typography color="text.primary" component="span" className={styles.borderCountryStyle}>back</Typography>*/}
                                    {/*        </Button>*/}
                                    {/*    </Link>*/}
                                    {/*</motion.div>*/}
                                </Grid>

                            </Grid>

                        </Grid>
                    }
                </Grid>

            </Grid>
        </Box>
        }
    </motion.div>)
}


export const getStaticPaths: GetStaticPaths = async () => {

    const countries = await CountryController.getAllCountries(qs.stringify({fields: 'cca2'}));
    return {
        paths: countries.map(c => ({params: {cca2: c.cca2}})),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<{
    country: Country;
}> = async ({params}: any) => {
    const countries = await CountryController.getCountryDetail(params.cca2);
    return {props: {country: countries[0]}};
};

export default CountryDetail