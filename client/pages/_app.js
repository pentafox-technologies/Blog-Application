import '../styles/globals.css';
import {ThemeProvider} from "styled-components"
import {lightTheme, darkTheme, GlobalStyles} from "../public/ThemeConfig"
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Head from 'next/head';import { CookiesProvider } from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.css'

export default function App({Component, pageProps})
{
  return (
      <CookiesProvider>
     <ThemeProvider theme={lightTheme}>
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <GlobalStyles />
          <Component {...pageProps} />
      <ToastContainer />
        </ThemeProvider>
      </CookiesProvider>
       
  )
}