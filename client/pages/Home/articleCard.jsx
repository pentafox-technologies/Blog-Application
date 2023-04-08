import React from 'react'
import {Box} from "@mui/material/";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import articleCardImage from "./../../public/articleCardImage.jpg";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function articleCard() {
  
  const isNonMobileScreens = useMediaQuery("(min-width:720px)");

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: isNonMobileScreens ? "50%" : "100%",
          alignItems: 'center'
        }}
      >
        <Row>
          <Col md={5} ><Image src={articleCardImage} width={isNonMobileScreens ? "25%" : "100%"} height={isNonMobileScreens ? "25%" : "100%"} style={{display:"inline"}} alt='article image'/></Col>
          <Col md={7}>
            <Row><p style={{display:"inline"}}> <a href='#' style={{textDecoration:"none", color:"blue"}}>Category Name</a> | Published Date</p></Row>
            <Row><h3 style={{display:"inline", fontWeight: 'normal' }}>Some brief description about the Article</h3> <br/></Row>
            <Row><p>5 min read - here we will have the starting few lines from the article for better understatnding of the article. It shpuld contains three lines in the card displayed</p></Row>
          </Col>
        </Row>
      </Box>
    </div>
  )


}

export default articleCard