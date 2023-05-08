import Head from 'next/head';
import {CssBaseline} from '@mui/material' 
import React,{useState} from 'react';
import Signup from '../components/Signup';


export default function signup() {

  return (
    <>
        <Head>
            <title>Signup</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssBaseline /> 
        <Signup/>
    </>
  )
}
