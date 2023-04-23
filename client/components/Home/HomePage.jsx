import React from "react";
import ArticleCard from "./articleCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import { GlobalStyles } from "../../pages/ThemeConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styles from "../../styles/Home.module.css";

function HomePage() {
  const [Articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  async function getArticles() {
    await fetch(`http://localhost:5000/api/v1/article`)
    .then(response => response.json())
    .then(data => {
      setArticles(data.data)
    })
    await fetch(`http://localhost:5000/api/v1/category`)
      .then(response => response.json())
      .then(data => {
        const topCat = data.data.map(cat => {return cat.categoryName})
        setCategories(topCat)
      })
    // setCatgories([
    //   "Food blogs",
    //   "Programming",
    //   "Web Technology",
    //   "UI/UX Design",
    //   "Vehicle",
    //   "Content Creation",
    // ]);
    // setArticles([
    //   {
    //     slug: "post-3dsx9r3nab6t",
    //     categoryName: "Design",
    //     publishedDate: "2023-03-15",
    //     title: "UI/UX Design Trends 2023",
    //     content:
    //       "Yet another year is coming to a close. Many of the 2022 trends we anticipated, did find their use in digital products across our devices this year. As we are about to welcome 2023, we are taking a more careful",
    //   },
    //   {
    //     slug: "post-3dsx9r3nab6t",
    //     categoryName: "UI/UX  ",
    //     publishedDate: "2023-03-15",
    //     title: "Advanced Figma components tips & tricks: little gems we love",
    //     content:
    //       "As you all loved Advanced Figma Tips & Tricks and Prototyping Tips & Tricks, here is the third part: In this article, I’ll share some of my",
    //   },
    //   {
    //     slug: "post-3dsx9r3nab6t",
    //     categoryName: "Other",
    //     publishedDate: "2023-03-15",
    //     title: "How I Make $1.5k Monthly Passive Income at Age 28",
    //     content:
    //       "Steal the formula, upgrade your life — I never thought I’d make a dime from writing online. I’ve taken zero courses, didn’t study writing at school, had no mentors, nothing. There were no shortcuts in my",
    //   },
    // ]);
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="row">
      <div className="col-md-8">
        {Articles &&
          Articles.map((article) => <ArticleCard Article={article} />)}
      </div>
      <div className="col-md-4 mt-4 position-sticky">
        <div className="recommendations">
          <h2 className="heading">Recommended Category</h2>
          <div className={styles.categories}>
            {categories.map((category) => (
              <Link href="/" className={styles.category}>
                {category}
              </Link>
            ))}
          </div>
        </div>
        <div className="aboutUs">
          <h2 className="heading mt-5">About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Cupiditate, error officia dignissimos quaerat aperiam sapiente
            soluta accusantium rerum commodi non dolorum optio iusto est. Eos
            neque quod ipsam quisquam reiciendis quam fugiat commodi, asperiores
            beatae!
          </p>
        </div>
        <div className="socialMedias">
          <h2 className="heading mt-5">Connect with Us</h2>
          <div className="socialLinks">
            <a href="" target="_blank">
              <FontAwesomeIcon
                style={{
                  color: "black",
                  fontSize: "1.8rem",
                  margin: "0.5rem 1rem",
                }}
                className={styles.facebook}
                icon={faFacebook}
              />
            </a>
            <a href="" target="_blank">
              <FontAwesomeIcon
                style={{
                  color: "black",
                  fontSize: "1.8rem",
                  margin: "0.5rem 1rem",
                }}
                className={styles.twitter}
                icon={faTwitter}
              />
            </a>
            <a href="" target="_blank">
              <FontAwesomeIcon
                style={{
                  color: "black",
                  fontSize: "1.8rem",
                  margin: "0.5rem 1rem",
                }}
                className={styles.youtube}
                icon={faYoutube}
              />
            </a>
            <a href="" target="_blank">
              <FontAwesomeIcon
                style={{
                  color: "black",
                  fontSize: "1.8rem",
                  margin: "0.5rem 1rem",
                }}
                className={styles.instagram}
                icon={faInstagram}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
