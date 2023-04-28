import React from "react";
import { Box } from "@mui/material/";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { GlobalStyles } from "../../public/ThemeConfig";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function articleCard({ Article }) {
  const isNonMobileScreens = useMediaQuery("(min-width:720px)");
  const Base64string = Article.coverImage?.slice(
    Article.coverImage.search(",") + 1
  );
  console.log(window.innerWidth);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          margin: "1.5rem 0rem",
          padding: "1rem",
          backgroundColor: "inherit",
          borderRadius: "1rem",
          justifyContent: "center",
        }}
      >
        <Row>
          <Col md={12} className="flex dir">
            <Image
              src={`data: image/png; base64, ${Base64string}`}
              width={isNonMobileScreens ? "250" : window.innerWidth}
              height={isNonMobileScreens ? "250" : window.innerHeight / 5}
              style={{ display: "inline", height: "25vh" }}
              alt="article image"
            />
            <Row>
              <p style={{ display: "inline" }}>
                {" "}
                <Link
                  href="#"
                  style={{
                    textDecoration: "none",
                    color: "blue",
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
          </Col>
        </Row>
      </Box>
    </div>
  );
}

export default articleCard;
