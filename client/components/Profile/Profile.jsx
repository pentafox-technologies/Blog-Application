import React, { useState } from "react";
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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Account from "./Account";
import { styled } from "@mui/material/styles";
import Password from "../Password";
import Posts from "./Posts";
import Draft from "./Draft";
import Pending from "./Pending";
import Pushback from "./Pushback";
import Rejected from "./Rejected";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "d1d1e9",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: "#6246ea",
      borderRadius: "5px",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#6246ea",
    },
  })
);

export default function Profile({token}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardMedia
          component="img"
          height="104"
          image="/profile.jpg"
          alt="Paella dish"
          style={{ height: "150px" }}
        />
      </Card>
      {/* <Box sx={{ width: '100%' }}> */}
      <Box sx={{ marginTop: 2 }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <StyledTab label="Account" {...a11yProps(0)} />
          <StyledTab label="Password" {...a11yProps(1)} />
          <StyledTab label="Posts" {...a11yProps(2)} />
          <StyledTab label="Draft" {...a11yProps(3)} />
          <StyledTab label="Pending" {...a11yProps(4)} />
          <StyledTab label="Pushback" {...a11yProps(5)} />
          <StyledTab label="Rejected" {...a11yProps(6)} />
        </StyledTabs>
        <Account value={value} index={0} />
        <Password value={value} index={1} />
        <Posts value={value} index={2} token={token}  />
        <Draft value={value} index={3} token={token}  />
        <Pending value={value} index={4} token={token}  />
        <Pushback value={value} index={5} token={token}  />
        <Rejected value={value} index={6} token={token}  />
      </Box>
    </>
  );
}
