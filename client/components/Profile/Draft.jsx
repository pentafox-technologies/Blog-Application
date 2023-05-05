import React, { useState, useEffect } from "react";
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

export default function Draft(props) {
  const { children, value, index, ...other } = props;
  const [Articles, setArticles] = useState("");

  const getArticles = async () => {
    await fetch(`http://localhost:5000/api/v1/article/getUserDraft`, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJrIiwiaWF0IjoxNjc4MTI1ODkwLCJleHAiOjE2ODU5MDE4OTB9.7gLX4JSaEr4_dMatxcOOMRkZjGzcsfRio8w4vRojypY`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.data);
      });
  };

  const columns = [
    {
      id: "coverImage",
      label: "Cover Image",
      minWidth: 100,
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
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
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
        <div className="m-3 py-3 ">
          <center>
            <Table columns={columns} rows={Articles} action={true} />
          </center>
        </div>
      )}
    </div>
  );
}

Draft.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
