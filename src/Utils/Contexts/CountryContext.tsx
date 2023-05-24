import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react';
import Country from "~/src/Utils/Entities/Country";


type filtersType = {
    countryName?:string,
    region?:string,
    sortBy?:'official' | 'population'
}


type ICountryCtxType = {
    countriesPart: Country[],
    countriesList:Country[],
    filters:filtersType,
    handleUpdateCountriesList:(list:Country[])=>void,
    setFilters:(value: (((prevState: filtersType) => filtersType) | filtersType)) => void,
    setCountriesPart:(value: (((prevState: Country[]) => Country[]) | Country[])) => void,
    setCountriesList:(value: (((prevState: Country[]) => Country[]) | Country[])) => void,
}

const CountryContext = createContext({} as ICountryCtxType);



export function CountryCtxProvider({ children }:{children:ReactNode}) {
    const [countriesPart, setCountriesPart] = useState<Country[]>([])
    const [countriesList, setCountriesList] = useState<Country[]>([])
    const [filters,setFilters] = useState<filtersType>({
        countryName:undefined,
        region:undefined,
        sortBy:undefined
    })


    const handleUpdateCountriesList = (list:Country[])=>{
        console.log({list})

        setCountriesList(list)
        setCountriesPart(list.slice(0,12))
    }
    //
    useEffect(()=>{
        if(filters.sortBy)
        handleUpdateCountriesList(
            filters.sortBy === 'official' ?
            countriesList.sort((a, b) => a.name.official < b.name.official ? -1 : (a.name.official > b.name.official ? 1 : 0)) :
            countriesList.sort((a, b) => a.population < b.population ? -1 : (a.population > b.population ? 1 : 0))
        )
    },[filters.sortBy])


    return (
        <CountryContext.Provider value={{
            filters,
            setFilters,
            countriesPart,
            countriesList,
            setCountriesPart,
            setCountriesList,
            handleUpdateCountriesList
        }}>
            {children}
        </CountryContext.Provider>
    );
}

export function useCountryContext() {
    return useContext(CountryContext);
}