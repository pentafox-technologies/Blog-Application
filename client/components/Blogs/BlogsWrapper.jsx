import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Form from "react-bootstrap/Form";
import CategorySearch from "../CategorySearch";

export default function BlogsWrapper() {
  const [topCategories, setTopCategories] = useState([]);
  const [topCategory, setTopCategory] = useState([]);
  const [Articles, setArticles] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");


  const getData = async () => {

    if(category==""){
      await fetch(`http://localhost:5000/api/v1/article`)
        .then((response) => response.json())
        .then((data) => {
          setArticles(data.data);
          console.log(Articles);
        });
      await fetch(`http://localhost:5000/api/v1/category`)
        .then((response) => response.json())
        .then((data) => {
          const topCat = data.data.map((cat) => {
            return cat.categoryName;
          });
          setTopCategories(topCat);
        });
      await fetch(`http://localhost:5000/api/v1/category/subCategory`)
        .then((response) => response.json())
        .then((data) => {
          setSubCategories(data.data);
        });
    }
    else{
      await fetch(`http://localhost:5000/api/v1/article/searchTopCategory/${category}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.data);
        console.log(data);
        console.log(Articles);
      });
    }
  };
  useEffect(() => {
    getData();
  }, [category]);

  return (
    <div
      className="row justify-content-center"
      style={{ backgroundColor: "white" }}
    >
      <hr />

      <div className="blogs col-md-6 col-sm-12">
        <div className="categorySearch" style={{ width: "15vw" }}>
          <CategorySearch data={topCategories} setCategory={setCategory} />
        </div>
        <hr />
        <div className="articles">
          {console.log(typeof Articles)}
          {Articles && Articles.map((article) => {
            return <BlogCard key={article.slug} article={article} />;
          })}
        </div>
      </div>
      <div className="col-md-4 col-sm-12 mx-2 p-3">
        <div className="recommendations">
          <h2 className="heading mt-4">Recommended Category</h2>
          <div className="categories my-4">
            {topCategories
              .sort()
              .slice(0, 9)
              .map((category) => (
                <p className="category">{category}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
