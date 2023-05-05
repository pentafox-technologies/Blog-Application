import React,{useState,useEffect} from 'react'
import {Typography,Box, Button, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container} from '@mui/material' 
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

// import { createTheme, ThemeProvider } from "@mui/material/styles";



export default function Account(props) {
    const { children, value, index, ...other } = props;
    const [isReadOnly, setIsReadOnly] = useState(true);
  const [fnameValue, setFnameValue] = useState('First Name');
  const [lnameValue, setLnameValue] = useState('Last Name');
  const [emailValue, setEmailValue] = useState('Email');
  const [mobileValue, setMobileValue] = useState('Mobile no');

  const getValues = async() => {
    await fetch(`http://localhost:5000/api/v1/user/rk`)
      .then((response) => response.json())
      .then((response) => {
        if(response.status=='success')
        setFnameValue(response.data.firstName)
        setLnameValue(response.data.lastName)
        setEmailValue(response.data.emailAddress)
        setMobileValue(response.data.firstName)
      });
  }

  useEffect(() => {
    getValues()
  },[])

  const toggleReadOnly = () => {
    if(!isReadOnly){
      setFnameValue("Anish");
      setLnameValue("R M");
      setEmailValue("anishmahi946@gmail.com");
      setMobileValue("7639642812");
    }
    setIsReadOnly(!isReadOnly);
  };

  const handleInputChange = (event) => {
    setTextValue(event.target.value);
  };
  const handleLnameChange = (event) => {
    setLnameValue(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  const handleMobileChange = (event) => {
    setMobileValue(event.target.value);
  };



    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box style={{marginTop:'45px'}}>
              <Grid container direction="column" justifyContent="center" alignItems="center">
            <Card sx={{ minWidth: 275, padding: 5 }}>
            <Grid container justifyContent="flex-end">
              <Button onClick={toggleReadOnly} variant="contained" style={{background: '#6246ea', color:'#fffffe', fontWeight:'600'}}>
                  {isReadOnly ? 'Enable' : 'Disable'} Editing
              </Button>
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
                    onChange={handleInputChange}
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
                <Grid item xs={12}>
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
                </Grid>
                {!isReadOnly && <Grid container justifyContent="center" style={{marginTop: '20px'}}>
                  <Button disabled={isReadOnly} variant="contained" style={{background: '#6246ea', color:'#fffffe', fontWeight:'600'}}>
                      Save
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