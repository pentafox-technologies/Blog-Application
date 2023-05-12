import Head from 'next/head';
import Navbar from '../components/navbar';
import Carousel from '../components/Carousel';
import HomePage from '../components/Home/HomePage';

export default function Home()
{
  return (
    <div>
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Carousel />
      <HomePage/>
    </div>
  )
}

