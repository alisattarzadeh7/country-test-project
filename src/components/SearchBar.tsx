import React, {useEffect, useState} from "react"
import Country from "~/src/Utils/Entities/Country";
import {Box, InputAdornment, TextField} from "@mui/material";
import {useDebounce} from "use-debounce";
import {useCountriesByName} from "~/src/Utils/Queries/CountryQueries";
import SearchIcon from '@mui/icons-material/Search';
import {useRouter} from "next/router";

interface ISearchBarProps {
    handleFilterList: (newList: Country[]) => void
}

const SearchBar: React.FC<ISearchBarProps> = ({handleFilterList}) => {
    const router = useRouter()
    const countryName = router.query.countryName as string ?? null
    const [name,setName] = useState(countryName)
    const [value] = useDebounce(name, 500);

    useCountriesByName(value, {
        enabled: !!value,
        onSuccess:(d)=> handleFilterList(d)
    })

    useEffect(()=>{
        if(value){
            router.replace(router.pathname,{
                query:value ? {countryName:value} : undefined
            },{
                shallow:true,
            })
        }
    },[value])

    useEffect(()=>{
        if(countryName)
        setName(countryName)
    },[countryName])

    const handleSearch =  (e:any) => {

            setName(e.target.value)
        }


    return (<TextField
        InputProps={{
            startAdornment: (  <InputAdornment position="start">
                <div  className="flex px-3 items-center" > <SearchIcon/></div>
            </InputAdornment>)
        }}
        className="w-full"
        value={name} onChange={handleSearch} id="outlined-basic" placeholder="search for a country"
        />)
}


export default SearchBar