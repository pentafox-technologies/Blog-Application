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
import { serialize } from "cookie";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });




export default function SignupForm() {
    const router = useRouter();
    const [username, setUsername] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [allDetails, setAllDetails] = useState(true);
    const [passwordCheck, setPasswordCheck] = useState(true);
    const [emailCheck, setEmailCheck] = useState(true);
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const vertical = 'top'
    const horizontal = 'center'
    const [usernameopen, setUsernameOpen] = React.useState(false);
    const [createdopen, setCreatedOpen] = React.useState(false);
    const [buttonText,setButtonText] = useState("Sign Up");

  
    const handleUsernameClick = () => {
      setUsernameOpen(true);
    };
  
    const handleUsernameClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setUsernameOpen(false);
    };
    const handleCreatedClick = () => {
        setCreatedOpen(true);
      };
    
      const handleCreatedClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setCreatedOpen(false);
      };
  
    function handleUsername(currentUsername){
        setUsername(currentUsername);
    }

    function handleFirstName(currentFirstName){
        setFirstName(currentFirstName);
    }

    function handleLastName(currentLastName){
        setLastName(currentLastName);
    }

    function handleEmail(currentEmail){
        setEmail(currentEmail);
    }

    function handlePassword(currentPassword){
        setPassword(currentPassword);
    }

    function handleConfirmPassword(currentConfirmPassword){
        setConfirmPassword(currentConfirmPassword);
    }

    async function handleSubmit(){
        
        // checking all details entered
        setUsernameAvailable(true);
        if(!username || !firstName|| !lastName || !email || !password || !confirmPassword){
            setEmailCheck(true);
            setPasswordCheck(true);
            setAllDetails(false);
            return;
        }
        setAllDetails(true);

        // email validation
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setPasswordCheck(true);
            setEmailCheck(false);
            return;
        }
        setEmailCheck(true);

        //password and confirm password checking
        if(password != confirmPassword){
            setPasswordCheck(false);
            return;
        }
        setPasswordCheck(true);
        // console.log(username,firstName,lastName,email,password,confirmPassword);
        setButtonText("Signing Up....");
        await axios
            .post(
                `http://localhost:5000/api/v1/user/signup`,
            {
                userName: username,
                profilePic: "default.jpg",
                firstName,
                lastName,
                emailAddress: email,
                password: password,
                returnSecureToken: true
            }
            )
            .then(response => {
                console.log(response.data.data[0]);
                Cookies.set('token', response.data.token,{ expires: 30});
                Cookies.set('userType', response.data.data[0].userType,{ expires: 30});
                Cookies.set('userName', response.data.data[0].userName,{ expires: 30});
                setButtonText("Sign Up");
                handleCreatedClick();
                router.push('/home');
                // res.status(200).json({message: response.data});
            })
            .catch(error => {
                console.log("error is",error);
                setButtonText("Sign Up");
                if(error.response.data.message === "Username not available"){
                    setUsernameAvailable(false);
                    handleUsernameClick();
                }
                // res.status(200).json({ error})
            });

    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
  return (
    <>
        <Snackbar open={usernameopen} autoHideDuration={3000} onClose={handleUsernameClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleUsernameClose} severity="error" sx={{ width: '100%',padding: '10px 20px' }}>
                Username not available
            </Alert>
        </Snackbar>
        <Snackbar open={createdopen} autoHideDuration={3000} onClose={handleCreatedClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleCreatedClose} severity="success" sx={{ width: '100%',padding: '10px 20px' }}>
                Account Created Successfully
            </Alert>
        </Snackbar>
        <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined" style={{ marginBottom: '15px'}}  className={logincss.grid}>
                    <TextField
                    fullWidth
                    id="outlined-required"
                    label="Username"
                    onChange = {e => handleUsername( e.target.value)}
                    style={{background: 'white'}}
                    />  
                </FormControl>
            </Grid>
            {!usernameAvailable && <Typography gutterBottom style={{color:'red',marginTop:'-10px', fontSize:'13px',marginLeft:'9px'}}>Username not available</Typography>} 
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined" style={{ marginBottom: '15px'}}  className={logincss.grid}>
                    <TextField
                    fullWidth
                    id="outlined-required"
                    label="First Name"
                    onChange = {e => handleFirstName( e.target.value)}
                    style={{background: 'white'}}
                    />  
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined" style={{ marginBottom: '15px'}}  className={logincss.grid}>
                    <TextField
                    fullWidth
                    id="outlined-required"
                    label="Last Name"
                    onChange = {e => handleLastName( e.target.value)}
                    style={{background: 'white'}}
                    />  
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined" style={{ marginBottom: '15px'}}  className={logincss.grid}>
                    <TextField
                    fullWidth
                    id="outlined-required"
                    label="Email"
                    onChange = {e => handleEmail( e.target.value)}
                    style={{background: 'white'}}
                    />  
                </FormControl>
            </Grid>
            {!emailCheck && <Typography gutterBottom style={{color:'red',marginTop:'-10px', fontSize:'13px',marginLeft:'9px'}}>Please Enter valid email</Typography>} 
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined"  className={logincss.grid}>
                    <InputLabel htmlFor="outlined-adornment-password"  >Password</InputLabel>
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
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined" className={logincss.grid}>
                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                    <OutlinedInput
                        onChange = {e => handleConfirmPassword( e.target.value)}
                        fullWidth
                        style={{background: 'white'}}
                        id="outlined-adornment-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Confirm Password"
                    />
                </FormControl>
                {!passwordCheck && <Typography gutterBottom style={{color:'red',marginBottom:'-10px', fontSize:'13px',marginLeft:'9px'}} align='center'>Password and Confirm Password not same</Typography>} 
                {!allDetails && <Typography gutterBottom style={{color:'red',marginTop:'8px',marginBottom:'-10px'}} align='center'>Please Enter All the Details</Typography>} 
            </Grid>
        </Grid>
        <Grid container  direction="column" justifyContent="center" alignItems="center" style={{padding:'20px 90px'}}>
            <Button variant="contained" style={{background: '#6246ea', color:'#fffffe', marginTop:'7px', fontWeight:'600'}} fullWidth={true} onClick={handleSubmit}>{buttonText}</Button>
        </Grid>
    </>
  )
}
