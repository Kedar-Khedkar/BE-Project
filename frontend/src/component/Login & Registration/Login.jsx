// import { useState, useEffect, useContext } from "react";
// import {
//   Row,
//   Col,
//   Button,
//   Form,
//   Image,
//   Card,
//   Container,
// } from "react-bootstrap";
// import TableGen from "../Table/Table";
// import pattern2 from "../../assets/Images/ttten.svg";

// import errors from "../Table/List";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useAuth } from "../context/UserContext";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function LoginForm() {
//   const initialValues = { email: "", password: "" };
//   const [formValues, setFormValues] = useState(initialValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [validated, setValidated] = useState(false);
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [invalidity, setInvalidity] = useState(false);
//   const auth = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const redirectPath = location.state?.path || "/dashboard";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validateForm(formValues));
//     setIsSubmit(true);
//     if (invalidity) {
//       setValidated(true);
//     }
//     axios
//       .post("http://localhost:5000/users/login", formValues,{withCredentials:true})
//       .then(function (response) {

//         console.log(response);
//         auth.login(response.data.objects.user);

//         // console.log(Cookies.get())
//         // navigate(redirectPath, { replace: true });
//       })
//       .catch(function (response) {
//         console.log(response);
//       });
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
//     if (!values.email) {
//       errors.email = "Email is required!";
//       setInvalidity(true);
//     } else if (!email_regex.test(values.email)) {
//       errors.email = "This is not a valid email format!";
//       setInvalidity(true);
//     }
//     if (!values.password) {
//       errors.password = "Password is required";
//       setInvalidity(true);
//     } else if (values.password.length < 4) {
//       errors.password = "Password must be more than 4 characters";
//       setInvalidity(true);
//     } else if (values.password.length > 10) {
//       errors.password = "Password cannot exceed more than 10 characters";
//       setInvalidity(true);
//     }
//     return errors;
//   };

//   return (
//     <>
//       <div
//         style={{ backgroundImage: `url(${pattern2})`, backgroundSize: "cover" }}
//       >
//         <Container
//           fluid
//           className={"jumbotron d-flex align-items-center min-vh-100"}
//         >
//           <Card style={{ width: "50rem" }} bg={"dark"} className={" mx-auto "}>
//             <Card.Body>
//               <Container>
//                 <Row>
//                   <Col md>
//                     <Image
//                       className={"d-none d-md-block  "}
//                       src={loginImg}
//                       alt="Login Ilustration "
//                     ></Image>
//                   </Col>

//                   <Col md>
//                     <h2 className={"text-center"}>Log In</h2>

//                     <Form
//                       noValidate
//                       onSubmit={handleSubmit}
//                       validated={validated}
//                     >
//                       <Form.Group className="mb-3" controlId="formBasicEmail">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control
//                           type="email"
//                           name="email"
//                           placeholder="name@mmcoe.edu.in"
//                           value={formValues.email}
//                           onChange={handleChange}
//                           isInvalid={invalidity}
//                           required
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {formErrors.email}
//                         </Form.Control.Feedback>
//                       </Form.Group>

//                       <Form.Group
//                         className="mb-3"
//                         controlId="formBasicPassword"
//                       >
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                           type="password"
//                           name="password"
//                           placeholder="Password"
//                           value={formValues.password}
//                           onChange={handleChange}
//                           isInvalid={invalidity}
//                           required
//                         />
//                         <Form.Control.Feedback type="invalid">
//                           {formErrors.password}
//                         </Form.Control.Feedback>
//                       </Form.Group>
//                       <Button variant="primary" type="submit">
//                         Submit
//                       </Button>
//                     </Form>
//                   </Col>
//                 </Row>
//               </Container>
//             </Card.Body>
//           </Card>
//         </Container>
//       </div>
//       {/* <TableGen errors={errors}/> */}
//     </>
//   );
// }
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Image,
  createStyles,
  SimpleGrid,Space
} from "@mantine/core";
import loginImg from "../../assets/Images/login-animate.svg";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import axios from "axios";
const useStyles = createStyles((theme) => ({
  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}))
export default function AuthenticationTitle() {
  const { classes, cx } = useStyles();
  const form = useForm({
    initialValues: { password: "", email: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      password: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  // const initialValues = { email: "", password: "" };
  //   const [formValues, setFormValues] = useState(initialValues);
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     console.log(e.target);
  //     setFormValues({ ...formValues, [name]: value });
  //     console.log(formValues);
  //   };
  const handleSubmit = (event, values) => {
    axios
      .post("http://localhost:5000/users/login", form.values, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        // auth.login(response.data.user);
        // console.log(Cookies.get())
        // navigate(redirectPath, { replace: true });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };

  return (
    <Container my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
       Marathwada Mitra Mandal's College of Engineering
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor href="#" size="sm" onClick={(event) => event.preventDefault()}>
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={20} mt={30} radius="md">
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
        >
          <div>
            <Image
            className={classes.image}
              fit="contain"
              height={400}
              src={loginImg}
              alt="Login Illustration"
            />
          </div>
          <div >
          <Space h="md" />
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <TextInput
                label="Email"
                placeholder="email"
                withAsterisk
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="password"
                withAsterisk
                {...form.getInputProps("password")}
              />

              <Group position="apart" mt="lg">
                <Anchor
                  onClick={(event) => event.preventDefault()}
                  href="#"
                  size="sm"
                >
                  Forgot password?
                </Anchor>
              </Group>
              <Button fullWidth mt="xl" type="submit">
                Sign in
              </Button>
            </form>
          </div>
        </SimpleGrid>
      </Paper>
    </Container>
  );
}
