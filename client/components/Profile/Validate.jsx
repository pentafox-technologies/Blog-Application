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
import Table from "../ValidateTable";

export default function Validate(props) {
  const { children, value, index, setRollback, token, ...other } = props;
  const [Articles, setArticles] = useState("");
  const [updateCount, setUpdateCount] = useState(0);

  const getArticles = async () => {
    await fetch(`http://localhost:5000/api/v1/article/getPendingVerification`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
  }, [updateCount]);

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
            {Articles ? (
              <Table
                columns={columns}
                rows={Articles}
                action={true}
                update={setUpdateCount}
                setRollback={setRollback}
              />
            ) : (
              <h4>There are no articles in draft</h4>
            )}
          </center>
        </div>
      )}
    </div>
  );
}

Validate.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
