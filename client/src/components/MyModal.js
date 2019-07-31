import React from 'react';
import { Modal } from 'react-bootstrap';

function MyModal(props) {
  return (
    <>
      <Modal {...props} size="lg" centered show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          {props.buttons}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;
