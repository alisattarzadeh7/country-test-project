import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react';

type layoutCtxType = {
    layoutSetter: (val:Record<keyof layoutCtxType['layout'],any>)=>void
    layout: {mode: "light" | "dark"}
}

const LayoutContext = createContext({} as layoutCtxType);

export function LayoutCtxProvider({ children }:{children:ReactNode}) {
    const [layout, setLayout] = useState(
    {
        mode:'light'  as 'light' | 'dark'
    });

    const layoutSetter = (val:Record<keyof layoutCtxType['layout'],any>)=>{
        setLayout(prevState => ({...prevState,...val}))
    }

    return (
        <LayoutContext.Provider value={{layout,layoutSetter}}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayoutContext() {
    return useContext(LayoutContext);
}