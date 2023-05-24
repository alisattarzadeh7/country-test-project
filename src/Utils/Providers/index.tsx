import React, {ReactElement} from "react"
import ReactQueryProvider from "~/src/Utils/Providers/ReactQueryProvider";
import MasterThemeProvider from "~/src/Utils/Providers/MasterThemeProvider";
import {LayoutCtxProvider} from "~/src/Utils/Contexts/LayoutContext";
import {CountryCtxProvider} from "~/src/Utils/Contexts/CountryContext";


interface IMainProviderProps {
    children: ReactElement
}

const MainProvider: React.FC<IMainProviderProps> = ({children}) => {
    return (<>
        <LayoutCtxProvider>
            <CountryCtxProvider>
                <MasterThemeProvider>
                    <ReactQueryProvider>
                        {children}
                    </ReactQueryProvider>
                </MasterThemeProvider>
            </CountryCtxProvider>
        </LayoutCtxProvider>
    </>)
}


export default MainProvider