import {Grid, Tooltip} from "@mui/material";
import {motion, useInView} from "framer-motion"
import qs from "qs"
import Country from "~/src/Utils/Entities/Country";
import Link from "next/link";
import CountryController from "~/src/Utils/Controllers/CountryController";
import React, {useCallback, useEffect, useRef, useState, useTransition} from "react";
import CountryCard from "~/components/CountryCard";
import {GetStaticProps, NextPage} from "next";
import SearchBar from "~/components/SearchBar";
import RegionSelect from "~/components/RegionSelect";
import SortSelect from "~/components/SortSelect";
import styles from "./home.module.scss"
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {ICallbackList} from "~/src/Utils/Types/global";
import {useCountryContext} from "~/src/Utils/Contexts/CountryContext";

const animationVariant = {
    hidden: {
        opacity: 0,
        x: 100
    },
    show: {
        opacity: 1,
        x: 0,

    },
    exit: {
        opacity: 0,
        x: 100
    },

}
const container = {
    hidden: {opacity: 0},
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
}


interface IHomeProps {
    allCountries: Country[]
}



const Home: NextPage<IHomeProps> = ({allCountries}) => {
    const {countriesPart,countriesList,setCountriesPart,setCountriesList,handleUpdateCountriesList} = useCountryContext()
    const searchParams = useSearchParams()
    const router = useRouter()
    const countryName = searchParams.get('countryName')
    const ref = useRef(null)
    const isInView = useInView(ref)
    const [, startTransition] = useTransition();

    const regionsList = allCountries.map(c => c.region).filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    })


    const handleSetFilter = useCallback(({name,value}:{name:string,value:string})=>{
        const params = new URLSearchParams(searchParams as any);
        if(!value)
            params.delete(name);
        else params.set(name, value);
        router.replace(params ? `${router.pathname}?${params}` : router.pathname)
    },[searchParams])


    useEffect(() => {
        if (isInView && countriesList && countriesPart.length !== countriesList.length)
            setCountriesPart(prevState => [...prevState, ...countriesList.slice(prevState.length, prevState.length + 12)])
    }, [isInView])



    const resetList = useCallback(() => {
        if (allCountries.length ! >= countriesList.length)
        {
            handleUpdateCountriesList(allCountries)
        }
    }, [])


    return (
        <>

            <Grid container justifyContent="space-between">
                <Grid item xs={12} md={5} mt={3}>
                    <SearchBar initialValue={countryName} handleSetFilter={handleSetFilter} reset={resetList}/>
                </Grid>
                <Grid item xs={12} md={7} lg={7} container className="xs:justify-start md:justify-end">
                    <Grid xs={12} md={6} mt={3} item container className="xs:justify-start md:justify-end"><SortSelect handleSetFilter={handleSetFilter}  /></Grid>
                    <Grid xs={12} md={6} mt={3} item container
                          className="xs:justify-start md:justify-end"><RegionSelect resetCountryList={resetList} handleSetFilter={handleSetFilter} list={regionsList}/></Grid>
                </Grid>
            </Grid>
            {
                countriesPart.length > 0 && <motion.div variants={container}
                                                    initial="hidden"
                                                    animate="show"
                                                    className={styles.mainContainer}
                >
                    <Grid container spacing={10}>
                        {
                            countriesPart?.map((country, index) => (

                                <Grid xs={12} md={4} lg={3} item container justifyContent="center" key={country.cca2}>
                                    <Link href={`/country/${country.cca2}`} className="w-full">
                                        <motion.div
                                            exit={{
                                                opacity: 0,
                                                x: 100,
                                                transition: {
                                                    delay: Math.min(index, 12) * 0.05
                                                }
                                            }}
                                            whileHover={{scale: 1.05}}
                                            key={country.cca2} variants={animationVariant}
                                        >
                                            <Tooltip title={country.name.official}>
                                                <div>
                                                    <CountryCard info={country}/>
                                                </div>
                                            </Tooltip>
                                        </motion.div>
                                    </Link>
                                </Grid>
                            ))
                        }
                    </Grid>
                </motion.div>
            }
            <div ref={ref}/>
        </>
    )
}

export const getStaticProps: GetStaticProps<{
    allCountries: Country[];
}> = async () => {
    const allCountries = await CountryController.getAllCountries(qs.stringify({fields: 'name,flags,cca2,population,region,capital,region'}));
    return {props: {allCountries:allCountries.sort((a, b) => a.name.official < b.name.official ? -1 : (a.name.official > b.name.official ? 1 : 0))}};
};

export default Home