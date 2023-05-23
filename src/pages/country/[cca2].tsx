import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import CountryController from "~/src/Utils/Controllers/CountryController";
import qs from "qs";
import Country from "~/src/Utils/Entities/Country";

interface ICountryDetailProps{
    country?:Country
}
const CountryDetail:NextPage<ICountryDetailProps> = () => {
    // console.log({country})
    return (<div></div>)
}

// export const getStaticPaths: GetStaticPaths = async () => {
//
//     const countries = await CountryController.getAllCountries(qs.stringify({fields: 'cca2'}));
//
//     return {
//         paths:countries.map(c=>({params:{cca2:c.cca2}})),
//         fallback: true,
//     };
// };
//
// export const getStaticProps: GetStaticProps<{
//     country: Country;
// }> = async ({params}:any) => {
//     const countries = await CountryController.getCountryDetail(params.cca2);
//     return { props: { country:countries[0] } };
// };

export default CountryDetail