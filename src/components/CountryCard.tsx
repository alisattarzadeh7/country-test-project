import React from "react";
import Country from "~/src/Utils/Entities/Country";
import CustomCard from "~/components/CustomCard";
import {Grid} from "@mui/material";
import TitleValueRow from "~/components/TitleValueRow";
import styles from "~/src/pages/country/countryDetail.module.scss";

interface ICountryCardProps{
    info:Country
}

const CountryCard:React.FC<ICountryCardProps>  = ({info})=>{
    return (
        <CustomCard sx={{width:'100%'}} title={info.name.official} image={info.flags.png} >
            <Grid container>
                <Grid xs={12} item>
                    <TitleValueRow  value={info.population} title="population"/>
                </Grid>
                <Grid xs={12} item>
                    <TitleValueRow  value={info.region} title="region"/>
                </Grid>
                <Grid xs={12} item>
                    <TitleValueRow  value={info.capital?.join(', ')} title="capital"/>
                </Grid>
            </Grid>
        </CustomCard>
    )
}


export default CountryCard