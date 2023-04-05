import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar'
import Link from 'next/link'

export default function Home()
{
  return (
    <div>
      <Head>
        <title>Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
    </div>
  )
}