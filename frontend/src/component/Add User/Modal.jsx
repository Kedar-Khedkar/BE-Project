import React, { useState } from 'react'
import { Modal, Button } from "react-bootstrap";

export default function ErrorModal(props) {
  // const [showModal, setShowModal] = useState(true);
  return (
    <>
      <Modal className='' size="xl"
       show={props.show}
        onHide={props.onHide} centered>
        <Modal.Header className='error-modal' closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
// Person.defaultProps = {
//   name: 'No name',
//   age: 0,
// }
