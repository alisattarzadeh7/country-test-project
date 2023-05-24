import React, {useDeferredValue, useEffect, useState} from "react"
import Country from "~/src/Utils/Entities/Country";
import {Box, InputAdornment, TextField} from "@mui/material";
import {useDebounce} from "use-debounce";
import {useCountriesByName} from "~/src/Utils/Queries/CountryQueries";
import SearchIcon from '@mui/icons-material/Search';
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";
import {ICallbackList} from "~/src/Utils/Types/global";
import {useCountryContext} from "~/src/Utils/Contexts/CountryContext";
import {useQueryClient} from "react-query";

interface ISearchBarProps {
    handleSetFilter:(query:{name:string,value:string})=>void;
    reset: () => void,
    initialValue: string | null,
}

const SearchBar: React.FC<ISearchBarProps> = ({reset, initialValue, handleSetFilter}) => {
    const router = useRouter()
    const [name, setName] = useState(initialValue ?? '')
    const [value, setValue] = useDebounce(name, 500);
    const {countriesPart, countriesList, filters, setFilters, handleUpdateCountriesList} = useCountryContext()
    const queryClient = useQueryClient()
    const filteredByRegionCaches = queryClient.getQueryData(['countries-by-region', filters.region]) as Country[]

    const {data} = useCountriesByName(value, {
        enabled: !!value,
    })


    useEffect(() => {
        if (data) {
            if (filteredByRegionCaches) {
                let list = data.filter(c => !!(filteredByRegionCaches.find(country => (country.region).toLowerCase() === (c.region).toLowerCase())))
                handleUpdateCountriesList(list)
            } else {
                let list = filters.region ? data.filter(item => (item.region)?.toLowerCase() === (filters.region)?.toLowerCase()) : data
                handleUpdateCountriesList(list)
            }
            setFilters(prevState => ({...prevState, countryName: value}))
        }
    }, [data])

    useEffect(() => {
        setFilters(prevState => ({...prevState, countryName: value}))
        reset()
        handleSetFilter({name: 'countryName', value})
    }, [value])


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('countryName');
        if (name) {
            setName(name)
            setValue(name)
            setFilters(prevState => ({...prevState, countryName: value}))
        }
    }, [])


    const handleSearch = (e: any) => {

        setName(e.target.value)
    }


    return (<TextField
        InputProps={{
            startAdornment: (<InputAdornment position="start">
                <div className="flex px-3 items-center"><SearchIcon/></div>
            </InputAdornment>)
        }}
        className="w-full"
        value={name} onChange={handleSearch} id="outlined-basic" placeholder="search for a country"
    />)
}


export default SearchBar