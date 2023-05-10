import React,{useState} from 'react'
import {Typography,Box, Button, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container} from '@mui/material' 
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Passwordcss from '../styles/Password.module.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import Cookies from "js-cookie";

// import { createTheme, ThemeProvider } from "@mui/material/styles";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function Password(props) {
    const { children, value, index, ...other } = props;
  const [oldValue, setOldValue] = useState();
  const [newValue, setNewValue] = useState();
  const [currentValue, setCurrentValue] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [currentNewValue, setCurrentNewValue] = useState();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentReenterValue, setCurrentReenterValue] = useState();
  const [showReenterPassword, setShowReenterPassword] = useState(false);

  const [oldPassCheck, setOldPassCheck] = useState(true);
  const vertical = 'top'
  const horizontal = 'right'
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
        console.log("hiii");
      event.preventDefault();
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  }


  const handleClickShowReenterPassword = () => {
    setShowReenterPassword((show) => !show);
  }



  const handleOldChange = (event) => {
    setOldValue(event.target.value);
  };
  const handleNewChange = (event) => {
    setNewValue(event.target.value);
  };
  const handleCurrentChange = (event) => {
    setCurrentValue(event.target.value);
  };
  
  async function updatePassword(){
    // const jwt = 
    const token = Cookies.get("token"); 
    const userName = Cookies.get("userName"); 
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    await axios
    .patch(
        `http://localhost:5000/api/v1/user/${userName}/password`,
    {
        oldPassword: oldValue,
        newPassword: newValue,
    },
    config
    )
    .then(response => {
    console.log(response);
    setOldPassCheck(true)
    handleClick();
    })
    .catch(error => {
        console.log(error);
        if(error.response.data.message === "Incorrect password"){
            setOldPassCheck(false)
        }
    });
        // if(oldValue == 'anish'){
        //     setOldPassCheck(true)
        //     handleClick();
        // }
        // else{
        //     setOldPassCheck(false)
        // }
        console.log(oldValue,newValue,currentValue);
  }




    return (

      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Updated Successfully
            </Alert>
        </Snackbar>
        {value === index && (
          <Box style={{marginTop:'45px'}}>
              <Grid container  direction="column" justifyContent="center" alignItems="center">
            <Card sx={{ minWidth: 275}} className={Passwordcss.cardPadding}>
                <Grid item xs={12}>
                <Typography variant='h6' gutterBottom style={{fontWeight:'600'}}>Old Password</Typography>
                <FormControl variant="outlined">
                            <OutlinedInput
                                onChange={handleOldChange}
                                error = {!oldPassCheck}
                                sx={{
                                    width: { xs:320, sm: 500, md: 500 },
                                        "& .MuiInputBase-root": {
                                            height: 50
                                        },
                                    marginBottom: 2
            
                                    }}
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
                                
                            />
                        </FormControl>
                       {!oldPassCheck && <Typography gutterBottom style={{color:'red'}}>Please Enter correct password</Typography>} 
                </Grid>
                <Grid item xs={12}>
                <Typography variant='h6' gutterBottom style={{fontWeight:'600'}}>New Password</Typography>
               
                <FormControl variant="outlined">
                            <OutlinedInput
                                onChange={handleNewChange}
                                sx={{
                                    width: { xs:320, sm: 500, md: 500 },
                                        "& .MuiInputBase-root": {
                                            height: 50
                                        },
                                    marginBottom: 2
            
                                    }}
                                 style={{background: 'white'}}
                                fullWidth
                                id="outlined-adornment-password"
                                type={showNewPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                
                            />
                        </FormControl>
                </Grid>
                <Grid item xs={12}>
                <Typography variant='h6' gutterBottom style={{fontWeight:'600'}}>Current Password</Typography>
                <FormControl variant="outlined">
                            <OutlinedInput
                                onChange={handleCurrentChange}
                                sx={{
                                    width: { xs:320, sm: 500, md: 500 },
                                        "& .MuiInputBase-root": {
                                            height: 50
                                        },
                                    marginBottom: 2
            
                                    }}
                                 style={{background: 'white'}}
                                fullWidth
                                id="outlined-adornment-password"
                                type={showReenterPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowReenterPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showReenterPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                
                            />
                        </FormControl>
                </Grid>
                <Grid container justifyContent="center" style={{marginTop: '20px'}}>
                  <Button variant="contained" style={{background: '#6246ea', color:'#fffffe', fontWeight:'600'}} onClick={updatePassword}>
                      Update Password
                  </Button>
                </Grid>
            </Card>
                

            </Grid>

            <div style={{height:'50px'}}>

            </div>
          </Box>
        )}
      </div>
    );
}

Password.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };