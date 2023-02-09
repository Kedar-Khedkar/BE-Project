// import React, { useState, useEffect } from "react";
// import pattern from "../../assets/Images/oooscillate.svg";
// import "./AddUser.scss";
// import axios from "axios";
// import {
//   Card,
//   Container,
//   Row,
//   Col,
//   Nav,
//   Form,
//   Button,
//   Modal,
// } from "react-bootstrap";
// import Dropzone from "../Drop zone/Dropzone";
// import ErrorModal from './Modal'


// function FacultyForm() {
//   const [validated, setValidated] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [invalidity, setInvalidity] = useState(false);
//   const initialValues = { email: "", fullname: "" };
//   const [formValues, setFormValues] = useState(initialValues);
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   useEffect(() => {
//     console.log(formErrors);
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(formValues);
//     }
//   }, [formErrors]);

//   const validateForm = (values) => {
//     const errors = {};
//     const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     const num_regex = /\d/;
//     // if (!values.email) {
//     //   errors.email = "Email is required!";
//     //   setInvalidity(true);
//     // } else if (!email_regex.test(values.email)) {
//     //   errors.email = "This is not a valid email format!";
//     //   setInvalidity(true);
//     // }

//     if (!values.fullname) {
//       errors.fullname = "Fullname is required!";
//       setInvalidity(true);
//     } else if (num_regex.test(values.fullname)) {
//       errors.fullname = "This is not a valid name format!";
//       setInvalidity(true);
//     }

//     return errors;
//   };

//   let errorsMsg={} ;
//   const handleFacultySubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validateForm(formValues));
//     setIsSubmit(true);
//     if (invalidity) {
//       setValidated(true);
//     }
//     // console.log(formValues);

//     // send values to backend
//     const user = { user: { ...formValues, role: "faculty" } };
//     axios
//       .post("http://localhost:5000/users/facultyRegister", user)
//       .then(function (response) {
//         console.log(response.data);
//       })
    
//       // .catch(function (error) {
//       //   setShow(true);
//       //   console.log(error.response.data);
//       //   errorsMsg=error.response.data;
//       // });
//   };

//   return (
//     <>
   
//       <ErrorModal show={show} onHide={handleClose} error={errorsMsg} />
//       <Form noValidate onSubmit={handleFacultySubmit} validated={validated}>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 onChange={handleChange}
//                 name="fullname"
//                 placeholder="Enter Name"
//                 isInvalid={invalidity}
//                 required
//               />
//               <Form.Control.Feedback type="invalid">
//                 {formErrors.fullname}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>

//           <Col md>
//             <Form.Group className="mb-3" controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 onChange={handleChange}
//                 placeholder="name@mmcoe.edu.in"
//                 isInvalid={invalidity}
//                 required
//               />
//               <Form.Control.Feedback type="invalid">
//                 {formErrors.email}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formFacultyId">
//               <Form.Label>Faculty ID</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter Faculty Id"
//                 // required
//               />
//             </Form.Group>
//           </Col>

//           <Col md>
//             <Form.Group className="mb-3" controlId="formPhoneNumber">
//               <Form.Label> Phone Number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter phone number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Button
//             variant="primary"
//             type="addUser"
//             className="align-self-center"
//           >
//             Add User
//           </Button>
//         </Row>
//       </Form>
//     </>
//   );
// }

// function StudentForm() {
//   const initialValues = { email: "", fullname: "" };
//   const [formValues, setFormValues] = useState(initialValues);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };
//   const handleStudentSubmit = (e) => {
//     e.preventDefault();
//     const user = { user: { ...formValues, role: "student" } };
//     axios
//       .post("http://localhost:5000/users/studentRegister", user)
//       .then(function (response) {
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         console.log(error.response.data);
//       });
//   };
//   return (
//     <>
//       <Form noValidate onSubmit={handleStudentSubmit}>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="fullname"
//                 onChange={handleChange}
//                 placeholder="Enter Name"
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="name@mmcoe.edu.in"
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formPhoneNumber">
//               <Form.Label> Phone Number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter phone number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formBatch">
//               <Form.Label>Batch</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Batch"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formPRNNumber">
//               <Form.Label> PRN Number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter prn number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formRollNumber">
//               <Form.Label>Roll number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter roll number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//           <Col md>
//             <Form.Group className="mb-3" controlId="formPhoneNumber">
//               <Form.Label>Parents Phone Number</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter parents phone number"
//                 // required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Button variant="primary" type="submit" className="align-self-center">
//             Add User
//           </Button>
//         </Row>
//       </Form>
//     </>
//   );
// }

// function Forms() {
//   const [category, setCategory] = useState("Faculty");
//   return (
//     <>
//       <div className="switchUser mt-3">
//         <Nav justify variant="pills" defaultActiveKey="Faculty">
//           <Nav.Item>
//             <Nav.Link
//               className="text-white"
//               eventKey="Faculty"
//               onClick={(event) => setCategory("Faculty")}
//             >
//               Faculty
//             </Nav.Link>
//           </Nav.Item>
//           <Nav.Item>
//             <Nav.Link
//               className="text-white"
//               eventKey="Student"
//               onClick={(event) => setCategory("Student")}
//             >
//               Student
//             </Nav.Link>
//           </Nav.Item>
//         </Nav>
//       </div>
//       <br />
//       <div className="addUserForm">
//         {category === "Faculty" ? <FacultyForm /> : <StudentForm />}
//       </div>
//     </>
//   );
// }

// export default function AddUser() {
//   const [checked, setChecked] = useState(false);

//   const handleChange = () => {
//     setChecked(!checked);
//   };
//   return (
//     <>
//       <div
//         style={{ backgroundImage: `url(${pattern})`, backgroundSize: "cover" }}
//       >
//         <Container
//           fluid
//           className={"jumbotron d-flex align-items-center min-vh-100"}
//         >
//           <Card style={{ width: "50rem" }} bg={"dark"} className={" mx-auto "}>
//             <Card.Body>
//               <Container>
//                 <Row>
//                   <Col md="auto">
//                     <h2 className={"text-center"}>Add User</h2>
//                     <span>
//                       Create account by uploading .csv files or create them
//                       manually.
//                     </span>

//                     <span>Passwords are generated automatically.</span>

//                     <div className={"text-center mt-1"}>
//                       <label className="switch">
//                         <input
//                           type="checkbox"
//                           checked={checked}
//                           onChange={handleChange}
//                         />
//                         <div>
//                           <span>Upload files</span>
//                         </div>
//                       </label>
//                     </div>
//                     <div>{checked ? <Dropzone /> : <Forms />}</div>
//                   </Col>
//                 </Row>
//               </Container>
//             </Card.Body>
//           </Card>
//         </Container>
//       </div>
//     </>
//   );
// }
