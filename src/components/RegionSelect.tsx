import React, {useDeferredValue, useEffect, useState} from "react"
import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    List,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {motion} from "framer-motion"
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
import Country from "~/src/Utils/Entities/Country";
import { useCountriesByRegion} from "~/src/Utils/Queries/CountryQueries";
import {ICallbackList} from "~/src/Utils/Types/global";
import {useCountryContext} from "~/src/Utils/Contexts/CountryContext";
import {useQueryClient} from "react-query";


interface IRegionSelectProps{
    list:string[],
    handleSetFilter:(query:{name:string,value:string})=>void;
    resetCountryList: () => void,
}

const RegionSelect: React.FC<IRegionSelectProps> = ({list,resetCountryList,handleSetFilter}) => {
    const router = useRouter()
    const regionName = router.query.region as string ?? null
    const [selectedRegion,setSelectedRegion] = useState('')
    const deferredValue = useDeferredValue(selectedRegion)
    const queryClient = useQueryClient()
    const {setFilters,filters,handleUpdateCountriesList} = useCountryContext()
    const filteredByNameCaches = queryClient.getQueryData(['countries-by-name',filters.countryName]) as Country[]
    useCountriesByRegion(selectedRegion, {
        enabled: (!!selectedRegion && !filteredByNameCaches),
        onSuccess:(d:Country[])=>{
            if(filteredByNameCaches){
                let data = filteredByNameCaches.filter(c=>(c.region).toLowerCase() === (selectedRegion).toLowerCase())
                handleUpdateCountriesList(data)
            }else{
                handleUpdateCountriesList(d)
            }
            setFilters(prevState=>({...prevState,region:selectedRegion}))
        }
    })
    const handleFilterByRegion = (e: SelectChangeEvent<string>)=>{

        if(filteredByNameCaches){
            let list = e.target.value ? filteredByNameCaches.filter(c=>(c.region)?.toLowerCase() === (e.target.value)?.toLowerCase()) : filteredByNameCaches;
            handleUpdateCountriesList(list)
        }else{
            if(!(!!(e.target.value))){
                resetCountryList()
            }
        }
            setSelectedRegion(e.target.value)

        setFilters(prevState => ({...prevState,region:e.target.value}))
        handleSetFilter({name:'region',value:e.target.value})
    }



    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const region = urlParams.get('region');
        if(region){
            setSelectedRegion(region)
            handleSetFilter({name:'region',value:region})
            setFilters(prevState => ({...prevState,region}))
        }
    },[])


    return (  <FormControl sx={{  minWidth: 250 }}>
        <Select
            role="get-by-region"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedRegion}
            displayEmpty
            onChange={handleFilterByRegion}
            placeholder="Filter by Region"
            renderValue={(selected) => {
                if (!selected) {
                    return <>Filter by Region</>;
                }
                return selected;
            }}
        >
            <MenuItem  value={undefined}>
                <motion.div  className="p-3 cursor-pointer" whileHover={{x:10}} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
                    All
                </motion.div>
            </MenuItem>
            {list &&list.map(((name,index) => (
                <MenuItem key={name} value={name}>
                    <motion.div  className="p-3 cursor-pointer" whileHover={{x:10}} initial={{opacity:0,y:10}} animate={{opacity:1,y:0,transition:{delay:(index + 1) * 0.04}}}>{name}</motion.div>
                </MenuItem>
            )))}
    </Select></FormControl>)
}


export default RegionSelect