import {Grid} from "@mui/material";
import {motion, useInView} from "framer-motion"
import qs from "qs"
import Country from "~/src/Utils/Entities/Country";
import Link from "next/link";
import CountryController from "~/src/Utils/Controllers/CountryController";
import {useCallback, useEffect, useRef, useState, useTransition} from "react";
import {useAllCountries} from "~/src/Utils/Queries/CountryQueries";
import CountryCard from "~/components/CountryCard";
import {GetStaticProps, NextPage} from "next";
import SearchBar from "~/components/SearchBar";
import RegionSelect from "~/components/RegionSelect";
import AnimatedPage from "~/components/AnimatedPage";
import SortSelect from "~/components/SortSelect";

const animationVariant = {
  hidden: {
    opacity: 0,
    x: 100
  },
  show: {
    opacity: 1,
    x: 0
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


interface IHomeProps{
  allCountries:Country[]
}

const Home:NextPage<IHomeProps> = ({allCountries}) => {
  const [countries, setCountries] = useState<Country[]>([])
  const [countryList,setCountryList] = useState<Country[]>(allCountries)
  const ref = useRef(null)
  const isInView = useInView(ref)
  const [, startTransition] = useTransition();


  useEffect(() => {
    if (isInView && countryList && countries.length !== countryList.length)
      setCountries(prevState => [...prevState, ...countryList.slice(prevState.length, prevState.length + 12)])
  }, [isInView])




  const handleFilterList = useCallback((newList:Country[])=>{
    startTransition(()=>{
      setCountryList(newList)
      setCountries(newList.slice(0, 12))
    })
  },[])

  return (
      <>
        <Link href="/testPage">go to testPage</Link>
        <Grid container  justifyContent="space-between">
          <Grid item xs={12} md={5} mt={3}>
            <SearchBar  handleFilterList={handleFilterList} />
          </Grid>
          <Grid item xs={12} md={7}  lg={5} container className="xs:justify-start md:justify-end" >
            <Grid xs={12} md={6} mt={3} item container className="xs:justify-start md:justify-end" ><SortSelect /></Grid>
            <Grid xs={12} md={6} mt={3} item container className="xs:justify-start md:justify-end" ><RegionSelect /></Grid>


          </Grid>
        </Grid>
        {
            countries.length > 0 && <motion.div variants={container}
                                                initial="hidden"
                                                animate="show"
            >
              <Grid container spacing={4}>
                {
                  countries?.map((country, index) => (

                      <Grid xs={12} md={4} lg={3} item container justifyContent="center" key={country.cca2}>
                        <Link  href={`/country/${country.cca2}`}>
                          <motion.div
                              exit={{
                                opacity: 0,
                                x: 100
                              }}
                              transition={{
                                delay:Math.min(index,12) * 0.05
                              }}
                              key={country.name.official} variants={animationVariant}
                          >
                            <CountryCard info={country}/>
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
  // const allCountries = await CountryController.getAllCountries(qs.stringify({fields: 'name,flags,cca2'}));
  return { props: { allCountries:[] } };
};

export default Home