import Head from 'next/head';
import Navbar from '../components/navbar'
import { Container} from '@mui/material' 
import Profile from '../components/Profile/Profile'
import { parseCookies } from "../helper/"

export default function profile({data}) {
  return (
    <>
        <Head>
              <title>Profile</title>
              <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar token={data.token} userName={data.userName}/>
        <Container maxWidth="xl" sx={{ marginTop: 2 }}>
        <Profile />
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
