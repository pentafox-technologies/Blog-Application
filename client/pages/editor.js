import React, {useRef, useState, useEffect} from "react";
import Navbar from "../components/navbar";
import Editor from "../components/Editor";

export default function MyEditor()
{
  return (
    <>
      <Navbar />
      <Editor />
    </>
  );
}
