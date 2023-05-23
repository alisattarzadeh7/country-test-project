import React from "react";
import Country from "~/src/Utils/Entities/Country";
import CustomCard from "~/components/CustomCard";


interface ICountryCardProps{
    info:Country
}

const CountryCard:React.FC<ICountryCardProps>  = ({info})=>{
    return (
        <CustomCard sx={{width:250}} title={info.name.official} image={info.flags.png} >
            test
        </CustomCard>
    )
}


export default CountryCard