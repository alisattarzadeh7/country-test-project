import type {AppProps} from 'next/app'
import MainProvider from "~/src/Utils/Providers";
import MasterLayout from "~/components/MasterLayout";
import "~/src/global.scss"
import {useRouter} from "next/router";
import {AnimatePresence} from "framer-motion";
import AnimatedPage from "~/components/AnimatedPage";

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    return (<MainProvider>
            <MasterLayout>
                <AnimatePresence mode="wait">
                    <AnimatedPage key={router.pathname}>
                        <Component {...pageProps} />
                    </AnimatedPage>
                </AnimatePresence>
            </MasterLayout>
    </MainProvider>)
}
