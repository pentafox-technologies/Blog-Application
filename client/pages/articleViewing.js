import React,{useState,useEffect} from 'react';
import Navbar from '../components/navbar'

function articleViewing() {

    const [article,setArticle] = useState(null)

    const slug = `uiux-design-trends-in-2023bfvjpapeq4t`

    async function getArticle() {
        const requestOptions = {headers: {"Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJrIiwiaWF0IjoxNjc4MTI1ODkwLCJleHAiOjE2ODU5MDE4OTB9.7gLX4JSaEr4_dMatxcOOMRkZjGzcsfRio8w4vRojypY`}};
          await fetch(`http://localhost:5000/api/v1/article/${slug}`, requestOptions)
              .then(response => response.json())
              .then(data => setArticle(data.data.content));
    }

    useEffect( ()=> {
        getArticle();
    },[])
    useEffect( ()=> {
        console.log(article);
    },[article])

  return (
    <>
    <Navbar/> 
    <div  dangerouslySetInnerHTML={{__html:article}} ></div>
    </>
  )
}

export default articleViewing