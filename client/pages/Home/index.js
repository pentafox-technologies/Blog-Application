import React from 'react'
import ArticleCard from './articleCard'
import { useState, useEffect } from "react";

function HomePage() {

  const [Articles, setArticles] = useState([]);

  async function getArticles(){
    // await fetch(`http://localhost:5000/api/v1/article`)
    // .then(response => response.json())
    // .then(data => {
    //   setArticles({data})
    // })
    setArticles([
      {
          "slug": "post-3dsx9r3nab6t",
          "categoryName": "Other",
          "publishedDate": "2023-03-15",
          "title": "POST-3",
          "content": "5 min read - here we will have the starting few lines from the article for better understatnding of the article. It shpuld contains three lines in the card displayed"
      },
      {
          "slug": "post-3dsx9r3nab6t",
          "categoryName": "Other",
          "publishedDate": "2023-03-15",
          "title": "POST-3",
          "content": "5 min read - here we will have the starting few lines from the article for better understatnding of the article. It shpuld contains three lines in the card displayed"
      },
      {
          "slug": "post-3dsx9r3nab6t",
          "categoryName": "Other",
          "publishedDate": "2023-03-15",
          "title": "POST-3",
          "content": "5 min read - here we will have the starting few lines from the article for better understatnding of the article. It shpuld contains three lines in the card displayed"
      }
  ])
  }

  useEffect(() => {
    getArticles();
  },[])

  return (
    <div>
        {Articles && Articles.map(article =>  <ArticleCard Article={article}/>)}
    </div>
  )
}

export default HomePage
