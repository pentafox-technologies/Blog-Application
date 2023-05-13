import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamondTurnRight } from "@fortawesome/free-solid-svg-icons";

export default function NotesPopup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
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
