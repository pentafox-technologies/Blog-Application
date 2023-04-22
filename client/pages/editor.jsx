import React, { useRef,useState} from "react";
import Navbar from "../components/navbar";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { faFloppyDisk, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@tinymce/tinymce-react";

export default function MyEditor() {
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
        title: '',
        content: '',
        description: '',
        coverImage: '',
        category: "Testing",
        topCategory: "Other",
    });

  const changeHandler = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const sendArticle = async e => {
    console.log(e.target.name)
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJrIiwiaWF0IjoxNjc4MTI1ODkwLCJleHAiOjE2ODU5MDE4OTB9.7gLX4JSaEr4_dMatxcOOMRkZjGzcsfRio8w4vRojypY`,
        },
        body: JSON.stringify({
          title: "This Article is Just for Testing Purpose",
          content: editorRef.current.getContent(),
          category: "Testing",
          topCategory: "Other",
        }),
      };

      await fetch("http://localhost:5000/api/v1/article", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  }

  // const log = async () => {
   
  // };

  return (
    <>
      <Navbar />
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
              apiKey="qzn9edvv53zrmyl73stphbo9mo6i8pqbdiyixeke877aj4xp"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                menubar: false,
                plugins:
                  "powerpaste casechange searchreplace autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage help formatpainter permanentpen charmap linkchecker emoticons advtable export print autosave",
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
            <Button name="draft" className="rounded-0 my-2" onClick={sendArticle}>
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
              <Form.Label>Description</Form.Label>

              <Form.Control
                as="textarea"
                placeholder="Type the description..."
                aria-label="With textarea"
                name="description"
                onChange={changeHandler}
              />
            </div>
            <hr />
            <div className="coverImage mt-4">
              <Form.Label>Cover image</Form.Label>
              <Form.Control name="coverImage" onChange={changeHandler} type="file" className="text-secondary" />
            </div>
            <hr />
            <div className="mt-4">
              <Form.Label>Last modification</Form.Label>
              <p className="text-secondary">19/04/2023 18:27</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
