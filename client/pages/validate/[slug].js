import React, {useEffect} from "react";
import Navbar from "../../components/navbar";
import ArticleViewing from "../../components/Profile/Validation/ValidatePage";
import {useRouter} from 'next/router'
import {parseCookies} from "./../../helper/"

function articleViewing({data})
{
    const router=useRouter();
    const {slug}=router.query;

    useEffect(() =>
    {
        console.log(slug);
    }, [slug])

    return (
        <>
            <Navbar token={data.token} userName={data.userName} />
            <ArticleViewing slug={slug} token={data.token} />
        </>
    );
}


articleViewing.getInitialProps=async ({req, res}) =>
{
    const data=parseCookies(req)
    return {
        data: data&&data,
    }
}

export default articleViewing;