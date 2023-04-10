import React from 'react'
import {Box} from "@mui/material/";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import articleCardImage from "./../../public/articleCardImage.jpg";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function articleCard({Article}) {
  
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
            <Row><p style={{display:"inline"}}> <a href='#' style={{textDecoration:"none", color:"blue"}}>{Article.categoryName}</a> | {Article.publishedDate}</p></Row>
            <Row><h3 style={{display:"inline", fontWeight: 'normal' }}>{Article.title}</h3> <br/></Row>
            <Row><p>{Article.content}</p></Row>
          </Col>
        </Row>
      </Box>
    </div>
  )
}

export default articleCard