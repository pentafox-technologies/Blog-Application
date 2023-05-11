import Head from 'next/head';
import Navbar from '../components/navbar'
import { Container} from '@mui/material' 
import Profile from '../components/Profile/Profile'
import { parseCookies } from "../helper/"
import { useState } from 'react';

export default function profile({data}) {
  const [profilePicChange,setProfilePicChange] = useState(0);
  console.log(data)
  return (
    <>
        <Head>
              <title>Profile</title>
              <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar token={data.token} userName={data.userName} pic={profilePicChange}/>
        <Container maxWidth="xl" sx={{ marginTop: 2 }}>
        <Profile updateNav={setProfilePicChange} data={data}/>
        </Container>
    </>
  )
}

profile.getInitialProps = async ({ req, res }) => {
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
