import React,{useRef} from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function MyEditor() {
  const editorRef = useRef(null);

  const log = async () => {
    if (editorRef.current) {
        console.log(editorRef.current.getContent());

        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json', "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJrIiwiaWF0IjoxNjc4MTI1ODkwLCJleHAiOjE2ODU5MDE4OTB9.7gLX4JSaEr4_dMatxcOOMRkZjGzcsfRio8w4vRojypY`},
          body: JSON.stringify({
            title:"This Article is Just for Testing Purpose",
            content:editorRef.current.getContent(),
            category:"Testing",
            topCategory: "Other"
          })
        };

        await fetch('http://localhost:5000/api/v1/article', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }
  };

  return (
    <div style={{margin: "4rem auto",
      padding: "0 2rem",
      backgroundColor: "#f9f9fb"}}>
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
       <button onClick={log}>save</button>
    </div>
  );
}