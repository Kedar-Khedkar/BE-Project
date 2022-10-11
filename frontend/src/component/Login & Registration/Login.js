import * as React from "react";

import {
  Row,
  Col,
  Button,
  Form,
  Image,
  Card, 
  Container,
} from "react-bootstrap";
// import collegeLogo from "../../assets/Images/collegeLogo.png";

import pattern2 from "../../assets/Images/ttten.svg";
import loginImg from "../../assets/Images/login-animate.svg";

export default function loginForm() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${pattern2})`, backgroundSize: "cover" }}
      >
        <Container
          fluid
          className={"jumbotron d-flex align-items-center min-vh-100"}
        >
          <Card style={{ width: "50rem" }} bg={"dark"} className={" mx-auto "}>
            <Card.Body>
              <Container>
                <Row>
                  <Col md>
                    <Image
                      className={"d-none d-md-block  "}
                      src={loginImg}
                      alt="Login Ilustration "
                    ></Image>
                  </Col>

                  <Col md>
                    <h2 className={"text-center"}>Log In</h2>
                    <Form noValidate>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="name@mmcoe.edu.in"
                          required
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          required
                          pattern="[A-Za-z]{3}"
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
