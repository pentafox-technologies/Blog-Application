import { NextResponse } from "next/server";
import axios from "axios";
import { redirect } from 'next/navigation';


import React from 'react'
import Cookies from "js-cookie";

export default async function middleware(req) {

  const url = req.url;
  if(req.nextUrl.pathname.startsWith('/home') || req.nextUrl.pathname.startsWith('/profile')) {
    // console.log("hiiiihello");
      let cookieFromRequest = req.cookies['token']
      const temp = Cookies.get("token"); 
      const jwt = req.cookies.get("token")?.value;
    
    if(jwt === undefined) {
      req.nextUrl.pathname = '/login';
      // return NextResponse.rewrite(new URL('/login', req.url));
      return NextResponse.redirect(req.nextUrl);

    }
    // // try {
    //     const requestOptions = {method: "GET", headers: {"Authorization": `Bearer ${jwt}`}};
    //     const responsee = await fetch(`http://localhost:5000/api/v1/user/`, requestOptions)
    //     const data = await responsee.json();
    //     console.log(data);
    //         if(data.status == "error"){
    //             console.log("reached 1");
    //             return NextResponse.redirect("/login");
    //         }
    //         else{
    //             console.log("reached 3");
    //             return NextResponse.next()
    //         }
    const response = NextResponse.next();
    response.headers.set('X-HEADER', 'some-value-to-pass');
    return response;
    }
}
