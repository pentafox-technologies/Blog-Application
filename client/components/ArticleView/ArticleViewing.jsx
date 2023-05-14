import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import ArticleCard from "./ArticleCard";
import Image3 from "../../public/images/profilePic.jpg";
import { Typography } from "@mui/material";

export default function ArticleViewing({ slug }) {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [publishedDate, setPublishedDate] = useState(null);
  const [authorProfileImage, setAuthorProfileImage] = useState(null);

  const API = `http://localhost:5000`;
  const myLoader = ({ src }) => {
    return `${API}/coverImage/${coverImage}`;
  };
  const myLoader1 = ({ src }) => {
    console.log(`${API}/profilePic/${authorProfileImage}`)
    return `${API}/profilePic/${authorProfileImage}`;
  };
  const isNonMobileScreens = useMediaQuery("(min-width:720px)");
  var Base64string;

  async function getArticle() {
    const requestOptions = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJrIiwiaWF0IjoxNjc4MTI1ODkwLCJleHAiOjE2ODU5MDE4OTB9.7gLX4JSaEr4_dMatxcOOMRkZjGzcsfRio8w4vRojypY`,
      },
    };
    await fetch(`http://localhost:5000/api/v1/article/${slug}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setArticle(data.data.content);
        setPublishedDate(data.data.publishedDate.slice(0, 10));
        setAuthor(data.data.author);
        setCategory(data.data.category);
        setDescription(data.data.description);
        setTitle(data.data.title);
        setCoverImage(data.data.coverImage);
        setAuthorProfileImage(data.data.authorProfilePic);
      });
    await fetch(`http://localhost:5000/api/v1/article`)
      .then((response) => response.json())
      .then((data) => {
        {
          setRelatedArticles(data.data);
        }
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
              loader={myLoader1}
              src={`${API}/profilePic/${authorProfileImage}`}
              width={200}
              height={200}
              style={{
                borderRadius: "50%",
                height: "50px",
                width: "50px",
              }}
              alt="article image"
            />
            </div>
            <div className="metaInfo mx-3">
              <Typography className="py-1" style={{ fontSize: "1.1rem" }}>
                <b>{author}</b>
              </Typography>
              <div className="d-flex text-secondary py-1">
                <h6>{category}</h6>
                <span className="mx-2">.</span>
                <h6>{publishedDate}</h6>
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

        {/* More relatedarticles  */}
        <div className="col-lg-3 mx-5 my-5 p-4">
          <h2 className="heading">More on this Category</h2>
          {relatedArticles &&
            relatedArticles.map((article) => <ArticleCard Article={article} />)}
        </div>
      </div>
    </>
  );
}
