import './App.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Routes from "./routes.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ThemeProvider2} from "./hooks/useTheme/index.jsx";
import {HashRouter} from "react-router";

import './locales/i18n'

function App() {


    return (
        <>
            <HashRouter>
                <ThemeProvider2>
                    <Routes/>
                </ThemeProvider2>
            </HashRouter>
        </>
    )
}

export default App
