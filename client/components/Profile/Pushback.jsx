import React,{useState} from 'react'
import {Typography,Box, Button, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container} from '@mui/material' 
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';


export default function Pushback(props) {
    const { children, value, index, ...other } = props;



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
              <h1>Pushback content goes here</h1>
          </Box>
        )}
      </div>
    );
}

Pushback.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };