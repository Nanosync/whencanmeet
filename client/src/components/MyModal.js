import React from 'react';
import { Modal } from 'react-bootstrap';

function MyModal(props) {
  const {
    title,
    body,
    show,
    buttons,
    onHide,
    ...additionalProps
  } = props;

  const footer = buttons ? (
    <Modal.Footer>
      {buttons}
    </Modal.Footer>
  ) : null;

  return (
    <Modal {...additionalProps} aria-labelledby="contained-modal-title-vcenter" show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {footer}
    </Modal>
  );
}

export default MyModal;
