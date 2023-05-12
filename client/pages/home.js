import Head from 'next/head';
import Navbar from '../components/navbar';
import Carousel from '../components/Carousel';
import HomePage from '../components/Home/HomePage';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { parseCookies } from "../helper/"
import React from 'react';
import axios from 'axios';

// const [cookies, setCookie, removeCookie] = useCookies(['userName']);

export default function Home({data})
{
  React.useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div>
    
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.isLoggedIn && <Navbar token={data.token} userName={data.userName}/>}
      {!data.isLoggedIn && <Navbar/>}
      <Carousel />
      <HomePage/>
    </div>
  )
}

// export async function getStaticProps() {
//   const userName = Cookies.get('userName');
//   const posts = [
//     {
//       title: userName
//     }
// ]
//   console.log(posts);
//   return {
//     props: {
//       posts,
//     },
//   };
// }

// export async function getServerSideProps({ req, res }) {
//   const userName = Cookies.get('userName');
//   return {
//     props: {userName},
//   };
// }

Home.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);
  console.log(data);
  if(Object.keys(data).length == 0){
    data.isLoggedIn = false;
    return {
      data: data && data,
    }
  }
  console.log("can you see me");
  const config = {
    headers: { Authorization: `Bearer ${data.token}` }
};
  try{
    await axios
        .get(
          `http://localhost:5000/api/v1/user/isLoggedIn`,
          config
        )
        .then(async (response) => {
          data.isLoggedIn = true;
         });
  } catch(err){
    console.log(err);
    data.isLoggedIn = false;
  }

  console.log("😎😎😎",data);

  return {
    data: data && data,
  }
}
