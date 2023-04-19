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
          <Col md={5}>
            <Image
              src={articleCardImage}
              width={isNonMobileScreens ? "25%" : "90%"}
              height={isNonMobileScreens ? "25%" : "90%"}
              style={{ display: "inline" }}
              alt="article image"
            />
          </Col>
          <Col md={7}>
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
                  {Article.categoryName}
                </Link>{" "}
                | {Article.publishedDate}
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
                {Article.content}{" "}
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
