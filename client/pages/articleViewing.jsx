import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";
import Image3 from "../public/images/profilepic.jpg";

function articleViewing() {
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState(null);

  const slug = "10-open-source-projects-for-web-developers-in-2023ciw5lfs00hj";

  async function getArticle() {
    const requestOptions = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJrIiwiaWF0IjoxNjc4MTI1ODkwLCJleHAiOjE2ODU5MDE4OTB9.7gLX4JSaEr4_dMatxcOOMRkZjGzcsfRio8w4vRojypY`,
      },
    };
    await fetch(`http://localhost:5000/api/v1/article/${slug}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data.data.content);
        console.log(data.data);
        setAuthor(data.data.author);
        setCategory(data.data.category);
        setDescription(data.data.description);
        setTitle(data.data.title);
      });
  }

  useEffect(() => {
    getArticle();
  }, []);

  return (
    <>
      <Navbar />
      <div className="row">
        <div className="articleView col-md-6 my-5">
          <div className="articleinfo d-flex">
            <Image
              className=""
              width={70}
              height={70}
              src={Image3}
              alt="profile"
              style={{ borderRadius: "100%" }}
            />
            <div className="metaInfo mx-3 py-2">
              <h2 style={{ fontSize: "1rem" }}>
                <b>Author Name</b>
              </h2>
              <div className="d-flex text-secondary">
                <h6 style={{ marginRight: "0.8rem" }}>20/04/2023</h6>.
                <h6 style={{ marginLeft: "0.8rem" }}>{category}</h6>
              </div>
            </div>
          </div>
          <div className="title my-4">
            <h2 style={{ fontWeight: 600 }}>{title}</h2>
          </div>
          {/* <div className="description">{description}</div> */}
          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: article }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default articleViewing;
