import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import ErrorImage from "../../assets/Images/404space-animate.svg";
import "./Error.css";
export default function ErrorPage() {
  return (
    <>
      <div>
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <Image
                fluid
                src={ErrorImage}
                alt="Error illustration"
                className="error-image "
             />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={"error-text"}>
                <h2 className="text-center ">Whoops! Lost in Space?</h2>
                <h4 className="text-muted text-center">
                  The page you're looking for isn't found :(
                </h4>
                <h4 className="text-muted text-center">
                  We suggest you go back to home
                </h4>
                <div className='d-flex justify-content-center' >
                  <Button href="/" variant="outline-primary " >
                    Back to home
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Stack>
        <div className="d-flex justify-content-center">
          <Image
            fluid
            src={ErrorImage}
            alt="Error illustration"
            className="error-image"
            style={{ height: 450,overflow:'hidden' }}
          ></Image>
        </div>
      </Stack>
        <div>
          <h2 className="text-center">Whoops! Lost in Space?</h2>
          <h4 className="text-muted text-center">
            The page you're looking for isn't found :(
          </h4>
          <h4 className="text-muted text-center">
            We suggest you back to home
          </h4>
        </div> */}
    </>
  );
}
