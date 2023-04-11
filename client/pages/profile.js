import Head from 'next/head';
import Navbar from '../components/navbar'
import { Container} from '@mui/material' 
import Profile from '../components/Profile'

export default function profile() {
  return (
    <>
        <Head>
              <title>Profile</title>
              <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Container maxWidth="xl" sx={{ marginTop: 2 }}>
            <Profile />
        </Container>
    </>
  )
}
