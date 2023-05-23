import { useQuery, UseQueryResult} from "react-query";
import {AppQueryOptions} from "~/src/Utils/Types/global";
import CountryController from "~/src/Utils/Controllers/CountryController";
import Country from "~/src/Utils/Entities/Country";

export const useAllCountries = (params?:string,queryOptions?:AppQueryOptions): UseQueryResult<Country[]> =>{
    return useQuery('all-countries', ()=>CountryController.getAllCountries(params),queryOptions)
}
export const useCountriesByName = (name?:string,queryOptions?:AppQueryOptions): UseQueryResult<Country[]> =>{
    return useQuery(['countries-by-name',name], ()=>CountryController.getCountriesByName(name),queryOptions)
}



