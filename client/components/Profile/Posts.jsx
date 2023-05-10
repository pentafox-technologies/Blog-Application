import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
} from "@mui/material";
import PropTypes from "prop-types";
import Table from "../StylesTable";
import TextField from "@mui/material/TextField";

export default function Posts(props) {
  const { children, value, index,token, ...other } = props;
  console.log(token)
  const [Articles, setArticles] = useState("");

  const getArticles = async () => {
    await fetch(`http://localhost:5000/api/v1/article/getUserArticle`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setArticles(data.data);
      });
  };

  const columns = [
    {
      id: "coverImage",
      label: "Cover Image",
      minWidth: 170,
      align: "center",
    },
    {
      id: "title",
      label: "Title",
      minWidth: 170,
      align: "left",
    },
    {
      id: "category",
      label: "Category",
      minWidth: 170,
      align: "left",
    },
  ];

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="listOfPosts m-3 py-3 ">
          <center>
            {Articles? <Table columns={columns} rows={Articles} /> : <h4>No Articles Published yet</h4>}
          </center>
        </div>
      )}
    </div>
  );
}

Posts.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
