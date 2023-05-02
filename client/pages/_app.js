import '../styles/globals.css';
import {ThemeProvider} from "styled-components"
import {lightTheme, darkTheme, GlobalStyles} from "../public/ThemeConfig"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.css'

export default function App({Component, pageProps})
{
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
      <ToastContainer />
    </ThemeProvider>
  )
}