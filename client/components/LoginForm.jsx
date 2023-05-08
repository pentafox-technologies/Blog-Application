import { Grid } from '@mui/material' 
import logincss from '../styles/Login.module.css'
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Typography, Button} from '@mui/material' 
import axios from "axios";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const vertical = 'top'
    const horizontal = 'center'
    const [credentailopen, setCredentialOpen] = React.useState(false);
    const [allDetails, setAllDetails] = useState(true);
    const [loggedopen, setLoggedOpen] = React.useState(false);
    const [buttonText,setButtonText] = useState("Sign In");



    const handleCredentialClick = () => {
        setCredentialOpen(true);
      };
    
      const handleCredentialClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setCredentialOpen(false);
      };
      const handleLoggedClick = () => {
        setLoggedOpen(true);
      };
    
      const handleLoggedClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setLoggedOpen(false);
      };
    function handleUsername(currentUsername){
        setUsername(currentUsername);
    }

    function handlePassword(currentPassword){
        setPassword(currentPassword);
    }

    async function handleSubmit(){
        if(!username || !password){
            setAllDetails(false);
            return;
        }
        setAllDetails(true);
        setButtonText("Signing In.....");
        await axios
            .post(
                `http://localhost:5000/api/v1/user/login`,
            {
                userName: username,
                password: password,
                returnSecureToken: true
            }
            )
            .then(response => {
            // console.log(response.data.data.user[0].userType);
            
            Cookies.set('token', response.data.token,{ expires: 30});
            Cookies.set('userType', response.data.data.user[0].userType,{ expires: 30});
            Cookies.set('userName', response.data.data.user[0].userName,{ expires: 30});
            setButtonText("Sign In");
            handleLoggedClick();
            router.push('/home');
            })
            .catch(error => {
                console.log(error);
                setButtonText("Sign In");
                if(error.response.data.message === "Incorrect password or username"){
                    handleCredentialClick();
                }
            });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
  return (
    <>
        <Snackbar open={credentailopen} autoHideDuration={3000} onClose={handleCredentialClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleCredentialClose} severity="error" sx={{ width: '100%',padding: '10px 20px' }}>
                Incorrect username or password
            </Alert>
        </Snackbar>
        <Snackbar open={loggedopen} autoHideDuration={3000} onClose={handleLoggedClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleLoggedClose} severity="success" sx={{ width: '100%',padding: '10px 20px' }}>
                Logged In Successfully
            </Alert>
        </Snackbar>
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined" style={{ marginBottom: '15px'}}  className={logincss.grid}>
                    <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Username"
                    onChange = {e => handleUsername( e.target.value)}
                    style={{background: 'white'}}
                    />  
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined"  className={logincss.grid}>
                    <InputLabel htmlFor="outlined-adornment-password" className={logincss.gridpasslabel} >Password</InputLabel>
                    <OutlinedInput
                    required
                    onChange = {e => handlePassword( e.target.value)}
                            style={{background: 'white'}}
                        fullWidth
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                {!allDetails && <Typography gutterBottom style={{color:'red',marginTop:'8px',fontWeight: '600'}} align='center'>Please Enter All the Details</Typography>} 
            </Grid>
        </Grid>
        <Grid container spacing={1}  direction="row" justifyContent="flex-end" alignItems="center">
            <Grid item xs={5}>
                <Typography style={{color: '#6246ea', fontWeight: '600', marginTop:'5px'}} variant='body1' gutterBottom className={logincss.forget}>Forgot Password?</Typography>
            </Grid>
        </Grid>
        <Grid container  direction="column" justifyContent="center" alignItems="center" style={{padding:'10px 90px'}}>
            <Button variant="contained" style={{background: '#6246ea', color:'#fffffe', marginTop:'7px', fontWeight:'600'}} fullWidth={true} onClick={handleSubmit}>{buttonText}</Button>
        </Grid>
    </>
  )
}
