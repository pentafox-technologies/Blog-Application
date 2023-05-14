import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ article }) {
  const API = `http://localhost:5000`;
  console.log(article);
  const myLoader = ({ src }) => {
    return `${API}/coverImage/${article.coverImage}`;
  };
  return (
    <>
      <div className="row my-5">
        <div className="col-md-4">
          <Image
            loader={myLoader}
            src={`${API}/coverImage/${article.coverImage}`}
            width={"250"}
            height={"200"}
            style={{ display: "inline", height: "25vh" }}
            alt="article image"
          />
        </div>
        <div className="col-md-8">
          <div className="articleInfo">
            <p style={{ display: "inline-flex", fontSize: "1rem" }}>
              {/* {article.author} */}
              Author Name
            </p>
            <span className="mx-2">.</span>
            <p
              className="secondary"
              style={{ display: "inline-flex", fontSize: "0.9rem" }}
            >
              {article.publishedDate.slice(0, 10)}
            </p>
            <Link href="/" className="category mx-3">
              {article.category}
            </Link>
          </div>
          <Link
            className="textLink"
            href={`/post/${article.slug}`}
            style={{
              display: "inline",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {article.title}
          </Link>
          <div className="description mt-2">
            {article.description.slice(0, 180)}
            <Link href="/" className="textLink">
              ...Read more
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
