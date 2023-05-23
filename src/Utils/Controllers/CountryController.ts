import Country from "~/src/Utils/Entities/Country";
import Http from "~/src/Utils/Facades/Request";

export default class CountryController {
    static async  getAllCountries(params?:string):Promise<Country[]>{
       const res = await Http.get(`/all?${params}`)
       return  res.data
    }

    static async getCountryDetail(cca:string):Promise<Country[]>{
        const res = await Http.get(`/?${cca}`)
        return  res.data
    }

    static async  getCountriesByName(name?:string):Promise<Country[]>{
       const res = await Http.get(`/name/${name}`)
       return  res.data
    }
}