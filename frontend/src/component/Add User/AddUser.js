import React, { useState } from "react";
import pattern from "../../assets/Images/oooscillate.svg";
import { Card, Container, Row, Col, Nav, Form, Button } from "react-bootstrap";

function FacultyForm() {
  return (
    <>
      <Form noValidate>
        <Row>
          <Col md>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" required />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@mmcoe.edu.in"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md>
            <Form.Group className="mb-3" controlId="formFacultyId">
              <Form.Label>Faculty ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Faculty Id"
                required
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label> Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}
function StudentForm() {
  return (
    <>
      <Form noValidate>
        <Row>
          <Col md>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@mmcoe.edu.in"
                required
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label> Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md>
            <Form.Group className="mb-3" controlId="formBatch">
              <Form.Label>Batch</Form.Label>
              <Form.Control type="text" placeholder="Enter Batch" required />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formPRNNumber">
              <Form.Label> PRN Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter prn number"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>

          <Col md>
            <Form.Group className="mb-3" controlId="formRollNumber">
              <Form.Label>Roll number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter roll number"
                required
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Parents Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter parents phone number"
                required
              />
            </Form.Group>
          </Col>
        </Row>
      
      </Form>
    </>
  );
}

export default function AddUser() {
  const [category, setCategory] = useState("Faculty");

  return (
    <div
      style={{ backgroundImage: `url(${pattern})`, backgroundSize: "cover" }}
    >
      <Container
        fluid
        className={"jumbotron d-flex align-items-center min-vh-100"}
      >
        <Card style={{ width: "50rem" }} bg={"dark"} className={" mx-auto "}>
          <Card.Body>
            <Container>
              <Row>
                <Col md="auto">
                  <h2 className={"text-center"}>Add User</h2>
                  <span>
                    Create account by uploading .csv files or create them
                    manually.
                  </span>
                  <span>Passwords are generated automatically.</span>
                  <Card className="select-option" bg={"dark"}>
                    <Card.Body className="select-optionCard text-center">
                      <span>Upload .csv | Create Account</span>
                    </Card.Body>
                  </Card>
                  <div className="switchUser">
                    <Nav justify variant="pills" defaultActiveKey="Faculty">
                      <Nav.Item>
                        <Nav.Link
                          className="text-white"
                          eventKey="Faculty"
                          onClick={(event) => setCategory("Faculty")}
                        >
                          Faculty
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          className="text-white"
                          eventKey="Student"
                          onClick={(event) => setCategory("Student")}
                        >
                          Student
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <div className="addUserForm">
                    {category === "Faculty" ? <FacultyForm /> : <StudentForm />}
                  </div>
                  <Button
                    variant="primary"
                    type="addUser"
                    className="align-self-center"
                  >
                    Add User
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
