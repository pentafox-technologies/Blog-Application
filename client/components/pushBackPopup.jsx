import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function PushbackPopup({value}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p>
        {value.split(/\s+/).slice(0, 5).join(" ")} <p style={{display:"inline", color: "blue"}} onClick={handleShow}>...Read more</p>
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Pushback Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* I will not close if you click outside me. Don't even try to press
          escape key. */}
          {value}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}