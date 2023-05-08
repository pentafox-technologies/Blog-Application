import React, { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { faFloppyDisk, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tinymce/tinymce-react";
import MultipleTags from "../components/MultipleTags";
import AutoComplete from "../components/AutoComplete";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditorArea({token}) {
  const router = useRouter();
  const Article = router.query;

  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
    title: Article.title? Article.title : "",
    content: Article.content? Article.content : "",
    description: Article.description? Article.description : "",
    coverImage: Article.coverImage? Article.coverImage : "",
    category: Article.subCategory? Article.subCategory : "",
    topCategory: Article.category? Article.category : "",
  });
  console.log(formData)
  const [topCategories, setTopCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const getCategories = async () => {
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
  };

  useEffect(() => {
    getCategories();
  }, []);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setCoverImage = async (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const setTopCategory = (value) => {
    setFormData({ ...formData, topCategory: value });
  };

  const setSubCategory = (value) => {
    setFormData({ ...formData, category: value });
  };

  const setContent = () => {
    setFormData({ ...formData, content: editorRef.current.getContent() });
  };

  const sendArticle = async (e) => {
    if (formData.title === "") {
      toast("Article Title is Required", {
        hideProgressBar: false,
        autoClose: 1500,
        type: "warning",
        theme: "colored",
      });
    } else if (formData.content === "") {
      toast("Article cannot be empty", {
        hideProgressBar: false,
        autoClose: 1500,
        type: "warning",
        theme: "colored",
      });
    } else if (formData.description === "") {
      toast("Article Description is required", {
        hideProgressBar: false,
        autoClose: 1500,
        type: "warning",
        theme: "colored",
      });
    } else if (formData.topCategory === "") {
      toast("Article TopCategory is Required", {
        hideProgressBar: false,
        autoClose: 1500,
        type: "warning",
        theme: "colored",
      });
    } else if (formData.category === "") {
      toast("Article Category is Required", {
        hideProgressBar: false,
        autoClose: 1500,
        type: "warning",
        theme: "colored",
      });
    } else if (formData.coverImage === "") {
      toast("CoverImage Required", {
        hideProgressBar: false,
        autoClose: 1500,
        type: "warning",
        theme: "colored",
      });
    } else {
        let data;
        if(Article.slug){
          await axios
          .patch(
            `http://localhost:5000/api/v1/article/${Article.slug}`,
            { ...formData, status: e.target.name },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(async (response) => {
            console.log(response)
            data = response.data; });
      }
      else{
        await axios
          .post(
            "http://localhost:5000/api/v1/article",
            { ...formData, status: e.target.name },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(async (response) => {
            data = response.data; });
      }
      if (data.status === "success" && data.data==="Article upadted successfully") {
        toast("Article Updated successfully", {
          hideProgressBar: false,
          autoClose: 1500,
          type: "success",
          theme: "colored",
          });
          router.push("/profile");
        }
        else if(data.status === "success"){
            toast("Article created successfully", {
            hideProgressBar: false,
            autoClose: 1500,
            type: "success",
            theme: "colored",
            });
            router.push("/home");
        }
        else {
          setWarning({
            status: true,
            msg: "",
          });
          console.log("Article not created");

          toast("Some error occured in the server", {
            hideProgressBar: false,
            autoClose: 1500,
            type: "error",
            theme: "colored",
          });
        }
    }
  };
  return (
    <>
      <div className="row">
        <div
          className="col-md-9 justify-content-center"
          style={{
            margin: "2rem auto",
            padding: "0 1rem",
          }}
        >
          <div className="artilceTitle" style={{ padding: "0.8rem" }}>
            <Form.Control
              type="text"
              id="title"
              name="title"
              value={formData.title}
              placeholder="Title"
              style={{
                fontWeight: "600",
                fontSize: "1.2rem",
                padding: "0.5rem",
              }}
              onChange={changeHandler}
            />
          </div>
          <div
            className="editorArea"
            style={{
              margin: "1rem",
              padding: "0.5rem",
              backgroundColor: "#f9f9fb",
            }}
          >
            <Editor
              initialValue={formData.content}
              onChange={setContent}
              apiKey={process.env.TinyMCE_ApiKey}
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                menubar: false,
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments  | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat",
                height: "700px",
                toolbar_sticky: true,
                icons: "thin",
                skin: "material-classic",
                icons: "material",
                content_style: "material-classic",
              }}
            />
          </div>
        </div>

        {/* Controls for article */}

        <div
          className="col-md-3"
          style={{
            margin: "2rem auto",
            padding: "0 1rem",
          }}
        >
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
              onClick={sendArticle}
            >
              <FontAwesomeIcon className="mx-2" icon={faFloppyDisk} />
              Save to Draft
            </Button>
            <Button
              name="pending_verification"
              className="rounded-0 my-2"
              style={{ background: "#f57c00", border: "inherit" }}
              onClick={sendArticle}
            >
              <FontAwesomeIcon className="mx-2" icon={faPaperPlane} />
              Request for publishing
            </Button>
          </div>
          <div
            className="articleDetails"
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem 1rem",
              borderRadius: "10px",
            }}
          >
            <div className="description my-2">
              <Form.Label style={{ fontWeight: "600", color: "#363945" }}>
                Description
              </Form.Label>

              <Form.Control
                as="textarea"
                value={formData.description}
                placeholder="Type the description..."
                aria-label="With textarea"
                name="description"
                onChange={changeHandler}
              />
            </div>
            <hr />
            <div className="topCategory">
              <Form.Label style={{ fontWeight: "600", color: "#363945" }}>
                Top Category
              </Form.Label>
              <AutoComplete
                name={"TopCategory"}
                data={topCategories}
                getTopCaregory={setTopCategory}
                value={formData.topCategory}
              />
            </div>
            <hr />
            <div className="Categories">
              <Form.Label style={{ fontWeight: "600", color: "#363945" }}>
                Sub Category
              </Form.Label>
              <MultipleTags
                name={"SubCategory"}
                data={subCategories}
                getSubCaregory={setSubCategory}
                value={formData.category=="" ? [] : formData.category}
              />
            </div>
            <hr />
            <div className="coverImage mt-4">
              <Form.Label style={{ fontWeight: "600", color: "#363945" }}>
                Cover image
              </Form.Label>
              <Form.Control
                name="coverImage"
                onChange={setCoverImage}
                type="file"
                className="text-secondary"
              />
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}
