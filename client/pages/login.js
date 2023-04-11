import Head from 'next/head';
import {CssBaseline} from '@mui/material' 
import React,{useState} from 'react';
import Login from '../components/Login';


export default function login() {

  return (
    <>
        <Head>
            <title>login</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssBaseline /> 
        <Login />
    </>
  )
}
