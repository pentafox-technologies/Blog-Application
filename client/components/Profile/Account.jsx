import React,{useState,useEffect} from 'react'
import {Typography,Box, Button, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container} from '@mui/material' 
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Avatar from "@mui/material/Avatar";
import Cookies from 'js-cookie';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Form from "react-bootstrap/Form";
import { Image } from 'react-bootstrap';
import styles from '../../styles/Profile.module.css';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Account(props) {
  const API = `http://localhost:5000`;
  const { children, userName,token, value, index,updateNav, ...other } = props;
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [username, setUserName] = useState(userName);
  const [fnameValue, setFnameValue] = useState('First Name');
  const [lnameValue, setLnameValue] = useState('Last Name');
  const [emailValue, setEmailValue] = useState('Email');
  const [buttonText, setButtonText] = useState('Save');
  const [profileName, setProfileName] = useState('pname');
  const [emailCheck, setEmailCheck] = useState(true);
  const [userProfile, setuserProfile] = useState(null);
  const [formData, setFormData] = useState({
      userProfile: userProfile ? userProfile : ""
  });
  const [count,setCount] = useState(0);
  // const [mobileValue, setMobileValue] = useState('Mobile no');
  const vertical = 'top'
  const horizontal = 'right'
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const myLoader = ({ src }) => {
    return `${API}/profilePic/${Article.coverImage}`;
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getValues = async() => {
    await fetch(`http://localhost:5000/api/v1/user/${userName}`)
      .then((response) => response.json())
      .then((response) => {
        if(response.status=='success')
        console.log(response.data.profilePic);
        setFnameValue(response.data.firstName)
        setLnameValue(response.data.lastName)
        setEmailValue(response.data.emailAddress)
        setProfileName(response.data.profilePic)
      });
  }

  useEffect(() => {
    getValues()
  },[])

  // const toggleReadOnly = () => {
  //   if(!isReadOnly){
  //     setFnameValue(fnameValue);
  //     setLnameValue(lnameValue);
  //     setEmailValue(emailValue);
  //   }
  //   setIsReadOnly(!isReadOnly);
  // };

  const handleFnameChange = (event) => {
    setFnameValue(event.target.value);
  };
  const handleLnameChange = (event) => {
    setLnameValue(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  const handleMobileChange = (event) => {
    // setMobileValue(event.target.value);
  };


  async function handleSubmit(){
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) {
      setEmailCheck(false);
      return;
    }
    setEmailCheck(true);
    setButtonText('Saving...');
    const token = Cookies.get("token");
    const config = {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` 
        }
    };
    console.log(formData);
    const form = new FormData();
    form.append('userProfile', userProfile);
    console.log(form);
    if(userProfile){
      try{
        await axios
            .patch(
              `http://localhost:5000/api/v1/user/${userName}`,
              { userProfile,
                firstName: fnameValue,
                lastName: lnameValue,
                emailAddress: emailValue
              },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(async (response) => {
                // console.log(response.data.data);
                updateNav(count+1);
                setCount(count+1)
                setProfileName(response.data.data);
                setuserProfile(null);
                setButtonText('Save');

                handleClick();
             });
      } catch(err){
        setButtonText('Save');
        console.log(err)
      }
    }
    else{
      await axios
      .patch(
          `http://localhost:5000/api/v1/user/${userName}`,
      {
          firstName: fnameValue,
          lastName: lnameValue,
          emailAddress: emailValue
      },
      config
      )
      .then(response => {
        console.log(response.data);
        setButtonText('Save');
        handleClick();
      })
      .catch(error => {
          console.log(error);
      });
    }
    
  }

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Updated Successfully
            </Alert>
        </Snackbar>
        {value === index && (
          <Box style={{marginTop:'45px'}}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
            <Card sx={{ minWidth: 275, padding: 5 }}>
                {/* <Grid container justifyContent="flex-end" style={{marginBottom:'20px'}}>
                  <Button onClick={toggleReadOnly} variant="contained" style={{background: '#6246ea', color:'#fffffe', fontWeight:'600'}}>
                      {isReadOnly ? 'Enable' : 'Disable'} Editing
                  </Button>
                </Grid> */}
                <Grid container direction="column" justifyContent="center" alignItems="center" >
                  <Grid item>
                      {/* <div class="user-img1 row justify-content-center"> */}
                            {!userProfile && <>
                              <Image
                                loader={myLoader} 
                                src={`${API}/profilePic/${profileName}`} 
                                alt="userProfile" 
                                className={styles.photo1} />
                              <input type="file" className={styles.file1} id='file1'
                              onChange={(event) => {
                                console.log(event.target.files[0]);
                                setuserProfile(event.target.files[0]);
                                setFormData({ ...formData, userProfile: event.target.files[0] });
                              } } /><label for="file1" className={styles.uploadbtn1}><Image src="/Upload.svg" alt="" style={{ width: "20px" }} /></label></>}
                            
                            {userProfile && (<>
                              <Image src={URL.createObjectURL(userProfile)} alt="userProfile" className={styles.photo1} />
                              <input type="file" className={styles.file1} id='file1' 
                                onChange={(event) => {
                                  console.log(event.target.files[0]);
                                  setuserProfile(event.target.files[0]);
                                  setFormData({ ...formData, userProfile: event.target.files[0] });
                                } }/>
                              <label for="file1" className={styles.uploadbtn1}>
                                <Image src="/Upload.svg" alt="" style={{ width: "20px" }} />
                              </label>
                            </>)}
                    {/* </div> */}
                  </Grid>
                        
                  {/* <Grid item xs={12}>
                    <Avatar
                        sx={{ bgcolor: "#6246ea",width: 76, height: 76 }}
                        alt="Remy Sharp"
                        src="/broken-image.jpg"
                      >
                        <Typography variant='h4' gutterBottom style={{fontWeight:'600'}} align='center'>{username.charAt(0).toUpperCase()}</Typography>
                      </Avatar>
                  </Grid> */}
                  <Grid item xs={12}>
                    <p style={{color:'rgb(125, 125, 125)'}}>@{username}</p>
                  </Grid>
                  
                </Grid>
                <Grid item xs={12}>
                <Typography variant='h6' gutterBottom style={{fontWeight:'600'}}>First Name</Typography>
                <TextField
                     sx={{
                      width: { xs:300, sm: 500, md: 500 },
                        "& .MuiInputBase-root": {
                            height: 50
                        },
                      marginBottom: 2

                    }}
                    id="outlined-read-only-input"
                    // defaultValue="Anish"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    value={fnameValue}
                    onChange={handleFnameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                <Typography variant='h6' gutterBottom style={{fontWeight:'600'}}>Last Name</Typography>
                  <TextField
                  sx={{
                    width: { xs:300, sm: 500, md: 500 },
                      "& .MuiInputBase-root": {
                          height: 50
                      },
                      marginBottom: 2

                  }}
                    id="outlined-read-only-input"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    value={lnameValue}
                    onChange={handleLnameChange}
                    
                  />
                </Grid>
                <Grid item xs={12}>
                <Typography variant='h6' gutterBottom style={{fontWeight:'600'}}>Email</Typography>
                  <TextField
                  sx={{
                    width: { xs:300, sm: 500, md: 500 },
                      "& .MuiInputBase-root": {
                          height: 50
                      },
                      marginBottom: 2

                  }}
                    id="outlined-read-only-input"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    value={emailValue}
                    onChange={handleEmailChange}
                    
                  />
                </Grid>
                {!emailCheck && <Typography gutterBottom style={{color:'red',marginTop:'-10px', fontSize:'13px',marginLeft:'9px'}}>Please Enter valid email</Typography>} 
                {/* <Grid item xs={12}>
                <Typography variant='h6' gutterBottom style={{fontWeight:'600'}}>Mobile Number</Typography>
                  <TextField
                  sx={{
                    width: { xs:300, sm: 500, md: 500 },
                      "& .MuiInputBase-root": {
                          height: 50
                      },
                      marginBottom: 2

                  }}
                    id="outlined-read-only-input"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    value={mobileValue}
                    onChange={handleMobileChange}
                  />
                </Grid> */}
                {!isReadOnly && <Grid container justifyContent="center" style={{marginTop: '20px'}}>
                  <Button disabled={isReadOnly} variant="contained" onClick={handleSubmit} style={{background: '#6246ea', color:'#fffffe', fontWeight:'600'}}>
                      {buttonText}
                  </Button>
                </Grid>}
            </Card>
                

            </Grid>

            <div style={{height:'50px'}}>

            </div>
          </Box>
        )}
      </div>
    );
}

Account.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };