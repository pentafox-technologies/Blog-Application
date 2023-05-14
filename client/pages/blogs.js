import Head from 'next/head';
import Navbar from '../components/navbar';
import React from 'react';
import {parseCookies} from "../helper/"
import BlogsView from '../components/Blogs/BlogsWrapper';

export default function Blogs({data})
{
    return (
        <>
            <Navbar token={data.token} userName={data.userName} />
            <BlogsView />
        </>
    )
}

Blogs.getInitialProps=async ({req, res}) =>
{
    const data=parseCookies(req)

    return {
        data: data&&data,
    }
}