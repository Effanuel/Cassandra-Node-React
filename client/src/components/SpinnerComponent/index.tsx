import React from "react";
import { Spinner } from "react-bootstrap";

function SpinnerComponent() {
  return (
    <Spinner animation="border" role="status" variant="success" size="sm">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export { SpinnerComponent };
