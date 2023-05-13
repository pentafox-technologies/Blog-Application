import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamondTurnRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function NotesPopup({slug,token}) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notes,setNotes] = useState("");

  return (
    <>
      <Button
        name="pending_verification"
        className="rounded-0 my-2"
        style={{ background: "#f57c00", border: "inherit" }}
        onClick={handleShow}
      >
        <FontAwesomeIcon
          className="mx-2"
          icon={faDiamondTurnRight}
          onClick={handleShow}
        />
        Pushback with changes
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>PushBack Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Notes</Form.Label>
              <Form.Control onChange={(e) => {
                setNotes(e.target.value);
              }} as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              if(notes=="") {
                toast("Pushback notes is required", {
                  hideProgressBar: false,
                  autoClose: 1500,
                  type: "warning",
                  theme: "colored",
                });
              }
              await axios
                .post(
                  `http://localhost:5000/api/v1/article/pushbackArticle/${slug}`,
                  { pushbackNotes: notes},
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then(async (response) => {
                  const data = response.data;
                  console.log(data)
                  if(data.status=="success"){
                    toast("article pushedback successfully", {
                      hideProgressBar: false,
                      autoClose: 1500,
                      type: "success",
                      theme: "colored",
                    });
                    router.push("/profile");
                  }
                });
            }}
            className=" mx-2"
            style={{ background: "#f57c00", border: "inherit" }}
          >
            Push Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
