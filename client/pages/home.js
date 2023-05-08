import Head from 'next/head';
import Navbar from '../components/navbar';
import Carousel from '../components/Carousel';
import HomePage from '../components/Home/HomePage';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { parseCookies } from "../helper/"

// const [cookies, setCookie, removeCookie] = useCookies(['userName']);

export default function Home({data})
{
  // useEffect(() => {
  //   console.log('Cookies: ', cookies);
  // }, [cookies]);
  return (
    <div>
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar token={data.token} userName={data.userName}/>
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