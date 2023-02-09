import axios from "axios";
import React from "react";
import { Container, Card, Button, Row, Col, Dropdown } from "react-bootstrap";

export default function subjectClaim() {
  return (
    <>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet"/>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>

<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.4/css/select2.min.css" rel="stylesheet" />
      <Container>
        <Card bg={"dark"}>
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                      Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>All</Dropdown.Item>
                      <Dropdown.Item>1</Dropdown.Item>
                      <Dropdown.Item>2</Dropdown.Item>
                      <Dropdown.Item>3</Dropdown.Item>
                      <Dropdown.Item>4</Dropdown.Item>
                      <Dropdown.Item>5</Dropdown.Item>
                      <Dropdown.Item>6</Dropdown.Item>
                      <Dropdown.Item>7</Dropdown.Item>
                      <Dropdown.Item>8</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col-md-6 text-center mb-5">
                        <h2 class="heading-section">Multiselect #09</h2>
                      </div>
                    </div>
                    <div class="row justify-content-center">
                      <div class="col-lg-5 d-flex justify-content-center align-items-center">
                        <select class="js-select2" multiple="multiple">
                          <option value="O1" data-badge="">
                            Option1
                          </option>
                          <option value="O2" data-badge="">
                            Option2
                          </option>
                          <option value="O3" data-badge="">
                            Option3
                          </option>
                          <option value="O4" data-badge="">
                            Option4
                          </option>
                          <option value="O5" data-badge="">
                            Option5
                          </option>
                          <option value="O6" data-badge="">
                            Option6
                          </option>
                          <option value="O7" data-badge="">
                            Option7
                          </option>
                          <option value="O8" data-badge="">
                            Option8
                          </option>
                          <option value="O9" data-badge="">
                            Option9
                          </option>
                          <option value="O10" data-badge="">
                            Option10
                          </option>
                          <option value="O11" data-badge="">
                            Option11
                          </option>
                          <option value="O12" data-badge="">
                            Option12
                          </option>
                          <option value="O13" data-badge="">
                            Option13
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>

            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
