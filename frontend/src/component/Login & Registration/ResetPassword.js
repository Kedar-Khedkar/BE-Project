import React, { useState, useEffect } from "react";
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
  const [validated, setValidated] = useState(false);
  const initialValues = {
    old_password: "",
    new_password: "",
    confirm_newpassword: "",
  };
  const [formValues, setformValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [invalidity, setInvalidity] = useState(false);
      
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formValues));
    setIsSubmit(true);
    if (invalidity) {
      setValidated(true);
    }
    console.log(formValues);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validateForm = (values) => {
    const errors = {};

    if (!values.new_password) {
      errors.new_password = "New Password is required";
      setInvalidity(true);
    } else if (values.new_password.length < 4) {
      errors.new_password = "New Password must be more than 4 characters";
      setInvalidity(true);
    } else if (values.new_password.length > 10) {
      errors.new_password =
        "New Password cannot exceed more than 10 characters";
      setInvalidity(true);
    }
    if (!values.confirm_newpassword) {
      errors.confirm_newpassword = "Confirm New Password is required";
      setInvalidity(true);
    } else if (values.new_password !== values.confirm_newpassword) {
      errors.confirm_newpassword =
        "Confirm New Password and New Password must be same";
      setInvalidity(true);
    }
    return errors;
  };

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

                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Old Password</Form.Label>
                      <Form.Control
                        placeholder="Enter old password"
                        name="old_password"
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.old_password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        placeholder="Enter New password"
                        name="new_password"
                        onChange={handleChange}
                        isInvalid={invalidity}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.new_password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        placeholder="Enter new password again"
                        name="confirm_newpassword"
                        onChange={handleChange}
                        isInvalid={invalidity}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.confirm_newpassword}
                      </Form.Control.Feedback>
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
