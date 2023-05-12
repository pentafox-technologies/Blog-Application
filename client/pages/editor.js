import React, {useRef, useState, useEffect} from "react";
import Navbar from "../components/navbar";
import Editor from "../components/Editor";
import { parseCookies } from "../helper/"

export default function MyEditor({data})
{
  return (
    <>
      <Navbar token={data.token} userName={data.userName}/>
      <Editor token={data.token} />
    </>
  );
}


MyEditor.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req)

// if (res) {
//     if (Object.keys(data).length === 0 && data.constructor === Object) {
//       res.writeHead(301, { Location: "/" })
//       res.end()
//     }
//   }

  return {
    data: data && data,
  }
}