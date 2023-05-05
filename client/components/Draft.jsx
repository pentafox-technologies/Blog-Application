import React,{useState,useEffect} from 'react'
import {Typography,Box, Button, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container} from '@mui/material' 
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';


export default function Draft(props) {
    const { children, value, index, ...other } = props;
    const [Articles,setArticles] = useState("");

    const getArticles = async () => {
      await fetch(`http://localhost:5000/api/v1/article/getUserDraft`,
      {
        method: "GET",
        headers : {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJrIiwiaWF0IjoxNjc4MTI1ODkwLCJleHAiOjE2ODU5MDE4OTB9.7gLX4JSaEr4_dMatxcOOMRkZjGzcsfRio8w4vRojypY`}
        }
      ).then((response) => response.json())
      .then((data) => {
        console.log(data.data)
        setArticles(data.data);
      });
    }

    useEffect(() => {
      getArticles()
    },[])


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
              <h1>Draft content goes here</h1>
          </Box>
        )}
      </div>
    );
}

Draft.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };