import '../styles/globals.css';
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme, GlobalStyles } from "./ThemeConfig" 
import { CookiesProvider } from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.css'

export default function App({Component, pageProps})
{
    return(
      <CookiesProvider>
         <ThemeProvider theme={lightTheme}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </CookiesProvider>
       
        )
}