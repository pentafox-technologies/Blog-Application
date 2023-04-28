import React, {useEffect} from "react";
import Navbar from "../../components/navbar";
import ArticleViewing from "../../components/ArticleView/ArticleViewing";
import {useRouter} from 'next/router'


function articleViewing()
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
      <Navbar />
      <ArticleViewing slug={slug} />
    </>
  );
}

export default articleViewing;
