// import React from "react";
// import { Container, Row, Col, Image, Button } from "react-bootstrap";
// import ErrorImage from "../../assets/Images/404space-animate.svg";
// import "./Error.css";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/UserContext";
// import axios from 'axios'
// export default function ErrorPage() {
//   const auth = useAuth()
//   const onClickHandler = () => {
//     auth.logout()
//     axios.post('http://localhost:5000/faculty/')
//     axios.post('http://localhost:5000/users/logout')
//     // axios.get('http://localhost:5000/student/1')

//    }
//   return (
//     <>
//       <div>
//         <Container>
//           <Row>
//             <Col className="d-flex justify-content-center">
//               <Image
//                 fluid
//                 src={ErrorImage}
//                 alt="Error illustration"
//                 className="error-image "
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <div className={"error-text"}>
//                 <h2 className="text-center ">Whoops! Lost in Space?</h2>
//                 <h4 className="text-muted text-center">
//                   The page you're looking for isn't found :(
//                 </h4>
//                 <h4 className="text-muted text-center">
//                   We suggest you go back to home
//                 </h4>
//                 <div className="d-flex justify-content-center">
//                   <Link to="/attendance">
//                     <Button  variant="outline-primary ">
//                       Back to home
//                     </Button>
//                   </Link>
//                 </div>
//                 <div className="d-flex justify-content-center mt-2">

//                     <Button  variant="outline-primary" onClick={onClickHandler} >
//                       Logout
//                     </Button>

//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//     </>
//   );
// }

import { Container, Image, Text, Button, Center  } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import errorImg from "../../assets/Images/404-error-lost-in-space-animate.svg";

export default function ErrorPage() {
  return (
    <>
      <Container>
        <Image height={500} fit="contain" src={errorImg} />
        <Text fw={500} align="center" size={27}>
          Whoops! Lost in Space?
        </Text>
        <Text align="center" size={17}>
          The page you're looking for isn't found :(
        </Text>
        <Text align="center" size={17}>
          We suggest you go back to home
        </Text>
        <Center>
        <Button component="a" href="/" variant="subtle" leftIcon={<IconArrowLeft size={14} />} mt={6} size="lg">
      Back to Home
    </Button>
          </Center> 
      </Container>
    </>
  );
}
