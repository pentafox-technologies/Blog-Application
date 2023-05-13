import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Image3 from "../../../public/images/profilePic.jpg";
import { Typography } from "@mui/material";
import NotesPopup from "./PushBackDialog";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faDiamondTurnRight,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

export default function ArticleViewing({ slug }) {
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const API = `http://localhost:5000`;
  const myLoader = ({ src }) => {
    return `${API}/coverImage/${coverImage}`;
  };
  const isNonMobileScreens = useMediaQuery("(min-width:720px)");
  var Base64string;

  async function getArticle() {
    const requestOptions = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJrIiwiaWF0IjoxNjc4MTI1ODkwLCJleHAiOjE2ODU5MDE4OTB9.7gLX4JSaEr4_dMatxcOOMRkZjGzcsfRio8w4vRojypY`,
      },
    };
    await fetch(
      `http://localhost:5000/api/v1/article/getValidationArticle/${slug}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArticle(data.data.content);
        setAuthor(data.data.author);
        setCategory(data.data.category);
        setDescription(data.data.description);
        setTitle(data.data.title);
        setCoverImage(data.data.coverImage);
      });
  }

  useEffect(() => {
    getArticle();
  }, [slug]);

  useEffect(() => {
    Base64string = coverImage?.slice(coverImage.search(",") + 1);
  }, [coverImage]);

  return (
    <>
      <div
        className="row justify-content-center"
        style={{ backgroundColor: "white" }}
      >
        <div
          className="col-lg-6 col-sm-12 my-5 mx-5"
          style={{ marginRight: "6rem" }}
        >
          <div className="articleinfo flex my-3">
            <div className="profile">
              <Image
                className=""
                width={"100%"}
                height={"auto"}
                src={Image3}
                alt="profile"
                style={{ objectFit: "fit" }}
              />
            </div>
            <div className="metaInfo mx-3">
              <Typography className="py-1" style={{ fontSize: "1.1rem" }}>
                <b>Author Name</b>
              </Typography>
              <div className="d-flex text-secondary py-1">
                <h6 style={{ marginRight: "0.8rem" }}>20/04/2023</h6>
                <span style={{ fontWeight: "600" }}>.</span>
                <h6 style={{ marginLeft: "0.8rem" }}>{category}</h6>
              </div>
            </div>
          </div>
          <div className="title my-4">
            <h2 style={{ fontWeight: 600 }}>{title}</h2>
          </div>
          <div className="description articleText">{description}</div>
          <div className="coverImage my-3">
            <Image
              loader={myLoader}
              src={`${API}/coverImage/${coverImage}`}
              width={200}
              height={200}
              style={{ display: "inline", width: "100%" }}
              alt="article image"
            />
          </div>
          <div className="content" style={{ textAlign: "justify" }}>
            <div
              className="articleText"
              dangerouslySetInnerHTML={{ __html: article }}
            ></div>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 my-5">
          <div
            className="savingControls"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
            }}
          >
            <Button
              name="draft"
              className="rounded-0 my-2"
              // onClick={}
            >
              <FontAwesomeIcon className="mx-2" icon={faThumbsUp} />
              Approve and Publish
            </Button>
            <NotesPopup />
            <Button
              name="pending_verification"
              className="rounded-0 my-2"
              style={{ background: "#ba000d", border: "inherit" }}
              // onClick={}
            >
              <FontAwesomeIcon icon={faBan} className="mx-2" />
              Reject this article
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
