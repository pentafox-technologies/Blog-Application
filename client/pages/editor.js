import React, {useRef, useState, useEffect} from "react";
import Head from 'next/head';
import Navbar from "../components/navbar";
import Editor from "../components/Editor";

export default function MyEditor()
{

  <Head>
    <title>Blog App</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  return (
    <>
      <Navbar />
      <Editor />
    </>
  );
}
