import React, {ReactElement} from "react"
import {createTheme, ThemeProvider} from "@mui/material";
import {useLayoutContext} from "~/src/Utils/Contexts/LayoutContext";

interface IMuiProviderProps {
    children: ReactElement
}

const colorPalette = {
    primary:{
        main:'#FFFFFF',
        dark:'#2B3743',
        light:'#FFFFFF',
    },
    secondary:{
        main:'#FFFFFF',
        dark:'#212E37',
        light:'#FFFFFF',
    },

}


const textColor = {
    dark:{
        primary: '#FFFFFF'
    },
    light:{
        primary: '#212E37'
    },
}

const MuiProvider: React.FC<IMuiProviderProps> = ({children}) => {
    const {layout} = useLayoutContext()
    const boxShadow = `0px 0px 8px 0px ${layout.mode === 'light' ? '#cbcbcb' : 'rgba(0,0,0,0.19)'}`
    const theme = React.useMemo(() =>
            createTheme({
                palette: {
                    mode:layout.mode,
                    ...colorPalette,
                    text:textColor[layout.mode]
                },
                components:{
                    MuiAppBar:{
                        styleOverrides:{
                            root:{
                                background:colorPalette.primary[layout.mode],
                                boxShadow:`0px 2px 9px -3px ${layout.mode === 'light' ? '#cbcbcb' : 'rgba(0,0,0,0.32)'}`,
                                position:'relative'
                            }
                        }
                    },
                    MuiCard:{
                        styleOverrides:{
                            root:{
                                background:colorPalette.primary[layout.mode],
                                boxShadow
                            }
                        }
                    },
                    MuiInputBase:{
                        styleOverrides:{
                            root:{
                                border:'unset !important',
                                outline:'unset',
                                background:colorPalette.primary[layout.mode],
                                boxShadow,
                                '& fieldset':{
                                    border:'unset !important',
                                }
                            }
                        }
                    },
                    MuiMenu:{
                        styleOverrides:{
                            paper:{
                                background:colorPalette.primary[layout.mode],
                                boxShadow,
                            }
                        }
                    },
                    MuiButton:{
                        styleOverrides:{
                            root:{
                                boxShadow,
                                border:`solid 1px ${layout.mode === 'light' ? 'rgba(203,203,203,0.31)' : 'rgba(0,0,0,0.19)'}`
                            }
                        }
                    }
                }
            }),
        [layout.mode],
    );


    return (
        <ThemeProvider theme={theme}>
                {children}
        </ThemeProvider>
    )
}

export default React.memo(MuiProvider)