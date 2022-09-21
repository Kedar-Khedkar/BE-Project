import React from "react";
import pattern from "../../assets/Images/ssscribble.svg";
import {
  Row,
  Col,
  Button,
  Form,
  Image,
  Card,
  Container,
} from "react-bootstrap";
import passwordImg from "../../assets/Images/reset-password-animate.svg";
export default function ResetPassword() {
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
                <Col md>
                  <Image
                    className={"d-none d-md-block  "}
                    src={passwordImg}
                    alt="Login Ilustration "
                  ></Image>
                </Col>

                <Col md>
                  <h2 className={"text-center"}>Reset Password</h2>

                  <Form noValidate>
                    <Form.Group className="mb-3">
                      <Form.Label>Old Password</Form.Label>
                      <Form.Control placeholder="Enter old password" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control placeholder="Enter New password" disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        placeholder="Enter new password again"
                        disabled
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Reset Password
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
