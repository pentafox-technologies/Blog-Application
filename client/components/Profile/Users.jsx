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
import Table from "../UsersTable";
import TextField from "@mui/material/TextField";

export default function Posts(props) {
  const { children, value, index,token, ...other } = props;
  const [Users, setUsers] = useState("");
  const [updateCount, setUpdateCount] = useState(0);

  const getArticles = async () => {
    await fetch(`http://localhost:5000/api/v1/user/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data)
        setUsers(data.data);
      });
  };

  const columns = [
    {
      id: "userProfile",
      label: "User Profile",
      minWidth: 170,
      align: "center",
    },
    {
      id: "firstName",
      label: "First Name",
      minWidth: 170,
      align: "left",
    },
    {
      id: "lastName",
      label: "Last Name",
      minWidth: 170,
      align: "left",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "left",
    },
    {
      id: "userRole",
      label: "Role",
      minWidth: 170,
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    }
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
        <div className="listOfPosts m-3 py-3 ">
          <center>
            {Users? <Table columns={columns} rows={Users} action={true} update={setUpdateCount}/> : <h4>No Articles Published yet</h4>}
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
