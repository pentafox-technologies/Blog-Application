import {Typography, Button, Card, Grid, Container} from '@mui/material' 
import logincss from '../styles/Login.module.css'
import Image from 'next/image'
import React from 'react';
import SignupForm from './SignupForm';
import Link from 'next/link'


export default function Signup() {
    
  return (
    <Container maxWidth="lg" sx={{ marginTop: 3, marginBottom: 3 }}>
            <Card sx={{ minWidth: 275 }} className={logincss.card}>
            <Grid container spacing={2} >
                <Grid item xs={12} sm={12} md={6}>
                <Image src='/login.jpg' alt="me" width="0" height="0" sizes="100vw" style={{ width: '100%', height: '100%', padding: '20px' }}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className='SignupForm' style={{background: 'conic-gradient(from -45deg at calc(100%/3) calc(100%/3), #ffffff 90deg, #0000 0), conic-gradient(from -135deg at calc(100%/3) calc(2*100%/3), #ffffff 90deg, #f9f8f8 0 135deg, #0000 0), conic-gradient(from 135deg at calc(2*100%/3) calc(2*100%/3), #ffffff 90deg, #f9f8f8 0 135deg, #0000 0), conic-gradient(from 45deg at calc(2*100%/3) calc(100%/3), #ffffff 90deg, #f9f8f8 0 135deg, #0000 0,#ffffff 0 225deg,#f9f8f8 0)', backgroundSize: '64px 64px'}}>
                    <Typography align='center' variant='h4' sx={{marginTop:4}} style={{fontWeight: '600', color:'#2b2c34'}} gutterBottom>
                        Create Account
                    </Typography>
                    <Typography align='center' sx={{marginBottom:4}} style={{color: 'rgb(88, 88, 88)'}}>
                        The key to happiness is to sign up
                    </Typography>
                    <SignupForm />
                    {/* <Grid container spacing={1}  direction="row" justifyContent="flex-end" alignItems="center">
                        <Grid item xs={5}>
                            <Typography style={{color: '#6246ea', fontWeight: '600', marginTop:'5px'}} variant='body1' gutterBottom className={logincss.forget}>Forgot Password?</Typography>
                        </Grid>
                    </Grid>
                    <Grid container  direction="column" justifyContent="center" alignItems="center" style={{padding:'10px 90px'}}>
                        <Button variant="contained" style={{background: '#6246ea', color:'#fffffe', marginTop:'7px', fontWeight:'600'}} fullWidth={true}>Sign In</Button>
                    </Grid> */}
                    <Typography align='center' sx={{marginBottom:4}} style={{color: 'rgb(88, 88, 88)'}}>
                        Already have an account? <Link href='/login' style={{color: '#6246ea', fontWeight: '600', marginTop:'5px', textDecoration: 'none'}}>Login</Link>
                </Typography>
                </Grid>
                
            </Grid>
            </Card>
        </Container>
  )
}
