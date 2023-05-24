import React, {useCallback, useEffect, useState} from "react"
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
import Country from "~/src/Utils/Entities/Country";
import {useCountryContext} from "~/src/Utils/Contexts/CountryContext";


const sortTypes = [{label: 'Country Name', value: 'official'},{label: 'Population', value: 'population'}]

interface ISortSelectProps {
    handleSetFilter: (query: { name: string, value: string }) => void;
}

const SortSelect: React.FC<ISortSelectProps> = ({handleSetFilter}) => {
    const [selectedSortType, setSelectedSortType] = useState(null)
    const {filters,setFilters} = useCountryContext()
    const handleSort = (e: SelectChangeEvent<any>) => {
        setFilters(prevState => ({...prevState,sortBy:e.target.value}))
        handleSetFilter({name: 'sortBy', value: e.target.value})
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sortBy = urlParams.get('sortBy') as 'official' | 'population';
        if (sortBy)
            setFilters(prevState => ({...prevState,sortBy}))
    }, [])

    return (<FormControl sx={{minWidth: 250}}>
        <Select
            role="get-by-region"
            displayEmpty
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortTypes.find(t => t.value === filters.sortBy)}
            onChange={handleSort}
            defaultValue={sortTypes[0]}

        >
            {sortTypes.map(((option, index) => (
                <MenuItem key={option.value} value={option.value}>
                    <motion.div className="p-3 cursor-pointer" whileHover={{x: 10}} initial={{opacity: 0, y: 10}}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {delay: (index + 1) * 0.04}
                                }}>{option.label}</motion.div>
                </MenuItem>
            )))}
        </Select></FormControl>)
}


export default SortSelect