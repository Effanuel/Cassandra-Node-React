import React from "react";

import { Button, Modal, Form } from "react-bootstrap";

const ModalComponent = ({
  title,
  show,
  onSave,
  onClose,
  p_1,
  p_2,
  input_id1,
  input_id2,
  label_id1,
  label_id2,
  onInputChange,
  loadingComponent,
  disabled
}: any) => {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {label_id1 && (
              <Form.Group>
                <Form.Label>{label_id1}</Form.Label>
                <Form.Control
                  id={input_id1}
                  placeholder={p_1}
                  onChange={onInputChange}
                />
              </Form.Group>
            )}
            {label_id2 && (
              <Form.Group>
                <Form.Label>{label_id1}</Form.Label>
                <Form.Control
                  id={input_id2}
                  placeholder={p_2}
                  onChange={onInputChange}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSave} disabled={disabled}>
            {loadingComponent || "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ModalComponent };
