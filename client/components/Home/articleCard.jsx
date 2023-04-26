import React from "react";
import { Box } from "@mui/material/";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import articleCardImage from "./../../public/articleCardImage.jpg";
import { GlobalStyles } from "../../pages/ThemeConfig";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function articleCard({ Article }) {
  const isNonMobileScreens = useMediaQuery("(min-width:720px)");
  const Base64string = Article.coverImage?.slice(Article.coverImage.search(',')+1)
  console.log(window.innerWidth)

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          margin: "1.5rem 2rem",
          padding: "1rem",
          backgroundColor: "white",
          borderRadius: "1rem",
        }}
      >
        <Row>
          <Col md={4}>
            <Image
              src={`data: image/png; base64, ${Base64string}`}
              width={isNonMobileScreens ? "250" : window.innerWidth}
              height={isNonMobileScreens ? "250" : window.innerHeight / 5}
              style={{ display: "inline", height: "25vh" }}
              alt="article image"
            />
          </Col>
          <Col md={8}>
            <Row>
              <p style={{ display: "inline" }}>
                {" "}
                <Link
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    fontWeight: "600",
                  }}
                >
                  {Article.category}
                </Link>{" "}
                | {Article.publishedDate.slice(0, 10)}
              </p>
            </Row>
            <Row>
              <Link
                href="/"
                style={{
                  display: "inline",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <h3
                  style={{
                    display: "inline",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                  }}
                >
                  {Article.title}
                </h3>
              </Link>{" "}
            </Row>
            <Row>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                  textAlign: "justify",
                  // fontFamily: "Noto Serif Georgian",
                }}
              >
                {Article.description.slice(0, 250)}{" "}
                <Link
                  href="/"
                  style={{ textDecoration: "none", letterSpacing: "1px" }}
                >
                  {" "}
                  ...Read more
                </Link>
              </p>
            </Row>
          </Col>
        </Row>
      </Box>
    </div>
  );
}

export default articleCard;
