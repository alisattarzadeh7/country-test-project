import React, {ReactNode} from "react"
import {AppBar, Box, Button, Grid, Toolbar, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useLayoutContext} from "~/src/Utils/Contexts/LayoutContext";
import Script from "next/script";
import {motion} from "framer-motion"
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
interface IMasterLayoutProps{
    children:ReactNode
}

const MasterLayout:React.FC<IMasterLayoutProps> = ({children})=>{
    const {layout,layoutSetter} = useLayoutContext()
    const theme = useTheme()

    const handleChangeTheme = ()=>{
        layoutSetter({mode:layout.mode === 'light' ? 'dark' : 'light'})
    }


    return (<div className="w-screen h-screen flex flex-col">
        <AppBar position="static" sx={{p:2,height:80}}>
            <Toolbar variant="dense">
                <Grid container justifyContent="space-between">
                    <Typography variant="h5" color="inherit" component="div" fontWeight="bolder">
                        Where in the world?
                    </Typography>
                    <Button variant="text" sx={{boxShadow:'unset',border:'unset'}} onClick={handleChangeTheme} style={{textTransform: "capitalize",color:theme.palette.primary[layout.mode === 'light' ? 'dark' : 'light']}}>
                        <Typography color="inherit" component="span" fontWeight="bolder" ><Grid container justifyContent="center" alignItems="center">
                            {layout.mode === 'light' ?
                                <>
                                    <motion.div style={{height:24}} animate={{rotate:360,transition:{duration:0.3}}}><DarkModeOutlinedIcon/></motion.div> dark
                                </> : <>
                                    <motion.div style={{height:24}} animate={{rotate:-360,transition:{duration:0.3}}}><DarkModeIcon/></motion.div>
                                    light
                                </> }
                            &nbsp;Mode</Grid></Typography>
                    </Button>
                </Grid>
            </Toolbar>
        </AppBar>
       <Box p={4} px={6} bgcolor={theme.palette.primary[layout.mode]} className="flex-1">
           {children}
       </Box>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
        </Script>
    </div>)
}



export default MasterLayout