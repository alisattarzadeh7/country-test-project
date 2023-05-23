import React, {ReactElement} from "react"
import ReactQueryProvider from "~/src/Utils/Providers/ReactQueryProvider";
import MasterThemeProvider from "~/src/Utils/Providers/MasterThemeProvider";
import {LayoutCtxProvider} from "~/src/Utils/Contexts/LayoutContext";


interface IMainProviderProps {
    children: ReactElement
}

const MainProvider: React.FC<IMainProviderProps> = ({children}) => {
    console.log('main provider')
    return (<>
        <LayoutCtxProvider>
            <MasterThemeProvider>
                <ReactQueryProvider>
                    {children}
                </ReactQueryProvider>
            </MasterThemeProvider>
        </LayoutCtxProvider>
    </>)
}


export default MainProvider