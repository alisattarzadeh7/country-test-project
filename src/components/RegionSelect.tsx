import React, {useEffect, useState} from "react"
import {Box, FormControl, InputAdornment, InputLabel, List, Select, SelectChangeEvent, TextField} from "@mui/material";
import {motion} from "framer-motion"
import {useRouter} from "next/router";


interface IRegionSelectProps{
    list:string[]
}

const RegionSelect: React.FC<IRegionSelectProps> = ({list}) => {
    const [open,setOpen] = useState(false)
    const router = useRouter()
    const regionName = router.query.region as string ?? null
    const handleFilterByRegion = (r?:string)=>{
        console.log('this fn called')
        router.replace(router.pathname,{
            query:r ? {region:r} : undefined
        })
        setOpen(false)
    }


    return (  <FormControl sx={{  minWidth: 250 }}>
        <Select
            role="get-by-region"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={regionName}
            onClick={()=>setOpen(true)}
            open={open}
            placeholder="Filter by Region"

        >
            <motion.div onClick={()=>handleFilterByRegion()} className="p-3 cursor-pointer" whileHover={{x:10}} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>all</motion.div>
            {
                list && list.map((item,index)=><motion.div key={item} onClick={()=>handleFilterByRegion(item)} className="p-3 cursor-pointer" whileHover={{x:10}} initial={{opacity:0,y:10}} animate={{opacity:1,y:0,transition:{delay:(index + 1) * 0.04}}}>{item}</motion.div>)
            }

    </Select></FormControl>)
}


export default RegionSelect