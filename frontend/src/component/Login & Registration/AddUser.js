import React from "react";
import pattern from "../../assets/Images/oooscillate.svg";
import { Container } from "react-bootstrap";

export default function AddUser() {
  return (
    <div
      style={{ backgroundImage: `url(${pattern})`, backgroundSize: "cover" }}
    >
      <Container
        fluid
        className={"jumbotron d-flex align-items-center min-vh-100"}
      >
        
      </Container>
    </div>
  );
}
