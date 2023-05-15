import React from "react";
import ArticleCard from "./articleCard";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { GlobalStyles } from "../../public/ThemeConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter();
  const [Articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);

  async function getArticles() {
    await fetch(`http://localhost:5000/api/v1/article`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setArticles(data.data);
      });
    await fetch(`http://localhost:5000/api/v1/category`)
      .then((response) => response.json())
      .then((data) => {
        const topCat = data.data.map((cat) => {
          return cat.categoryName;
        });
        setCategories(topCat);
      });
  }

  useEffect(() => {
    getArticles();
  }, []);

  // To stick the right side area of home page

  const div = useRef();

  useLayoutEffect(() => {
    const divAnimate = div.current.getBoundingClientRect().top;
    const onScroll = () => {
      if (divAnimate < window.scrollY) {
        div.current.style.position = "fixed";
        div.current.style.top = 0;
        div.current.style.right = 0;
      } else {
        div.current.style.position = "relative";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="row">
      <div className="col-md-8">
        {Articles &&
          Articles.map((article) => (
            <ArticleCard key={article.slug} Article={article} />
          ))}
      </div>
      <div ref={div} className="col-md-4 pt-4">
        <div className="recommendations">
          <h2 className="heading">Recommended Category</h2>
          <div className={styles.categories}>
            {categories
              .sort()
              .slice(5, 14)
              .map((category) => (
                <p onClick={() => {
                  router.push({
                    pathname: "/blogs/",
                    query: {"category" : category},
                  });
                }} className={styles.category}>
                  {category}
                </p>
              ))}
          </div>
        </div>
        <div className="aboutUs">
          <h2 className="heading mt-5">About Us</h2>
          <p style={{ textAlign: "justify", marginRight: "1rem" }}>
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
