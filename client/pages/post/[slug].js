import React, {useEffect} from "react";
import Navbar from "../../components/navbar";
import ArticleViewing from "../../components/ArticleView/ArticleViewing";
import {useRouter} from 'next/router'
import { parseCookies } from "./../../helper/"

export default function articleViewing({data})
{
  const router=useRouter();
  const {slug}=router.query;

  useEffect(() =>
  {
    // console.log(slug);
    // <ArticleViewing slug={slug} />
  }, [slug])

  return (
    <>
      <Navbar token={data.token} userName={data.userName}/>
      <ArticleViewing slug={slug} />
    </>
  );
}


articleViewing.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req)

if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" })
      res.end()
    }
  }

  return {
    data: data && data,
  }
}