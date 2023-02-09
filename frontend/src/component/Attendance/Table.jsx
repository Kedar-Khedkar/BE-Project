// /* A React component. */
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Container, Button, Dropdown } from "react-bootstrap";
// export default function TableAttendance(props) {
//   const [attendList, setattendList] = useState([]);

//   /* Setting the state of the component to the props passed to it. */
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/student/search?curryear=2&curr_sem=3")
//       .then((res) => {
//         console.log(res.data.objects);
//         setattendList(res.data.objects);
//       });
//     axios.get("http://localhost:5000/faculty?sem=3")
//     .then((res)=>{
//       console.log(res.data.objects)
//     })
//   }, []);
//   // console.log(attendList);

//   /**
//    * If the checkbox is checked, then set the presentee property of the user to true.
   
//    * If the checkbox is unchecked, then set the presentee property of the user to false.
   
//    * If the checkbox is the "allSelect" checkbox, then set the presentee property of all
//    users to true.
  
//    * If the checkbox is the "allSelect" checkbox, then set the presentee property of all users to
//    * false.
//    */
//   const handleChange = (e) => {
//     const { name, checked } = e.target;
//     if (name === "allSelect") {
//       let tempUser = attendList.map((user) => {
//         return { ...user, presentee: checked };
//       });
//       setattendList(tempUser);
//     } else {
//       /* Mapping the array of objects and returning a new array of objects. */
//       let tempUser = attendList.map((user) =>
//         user.User.fullname === name ? { ...user, presentee: checked } : user
//       );
//       setattendList(tempUser);
//       // console.log(tempUser);
//     }
//   };
//   /**
//    * It takes an array of objects and sends it to the backend.
//    */
//   const handleClick = () => {
//     let presenteeList = [];
//     attendList.forEach((student) => {
//       let presenteeElement = {};
//       if (!student.presentee) {
//         presenteeElement.presentee = false;
//       } else {
//         presenteeElement.presentee = true;
//       }
//       presenteeElement.createdAt = student.date;
//       presenteeElement.SubjectSubCode = student.SubjectSubCode;
//       presenteeElement.StudentUserId = student.userId;
//       presenteeList.push(presenteeElement);
//     });
//     // attendList.forEach((student) => {
//     //   delete student.name;
//     //   delete student.rollno;
//     //   delete student.date;
//     //   if (!student.presentee) {
//     //     student.presentee = false;
//     //   }
//     // });
//     console.log("[*]", presenteeList);
//     axios
//       .post("http://localhost:5000/attend/multiple", presenteeList)
//       .then((response) => {
//         console.log(response);
//       });
//     setattendList([]);
//   };
//   return (
//     <>
//       <Container>
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   name="allSelect"
//                   // checked={
//                   //   attendList.filter((user) => user?.presentee !== true).length < 1
//                   // }
//                   /* Checking if all the users are present or not. If all the users are present, then
//                   it will be true, else it will be false. */
//                   checked={!attendList.some((user) => user?.presentee !== true)}
//                   onChange={handleChange}
//                 />
//               </th>
//               <th>Name</th>
//               <th>Roll No</th>
//               <th>Subject Code</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendList.map((user, i) => {
//               return (
//                 <tr key={i}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       name={user.User.fullname}
//                       /* Checking if the user is present or not. If the user is present, then it will
//                       be true, else it will be false. */
//                       checked={user?.presentee || false}
//                       onChange={handleChange}
//                     />
//                   </td>

//                   <td>{user.User.fullname}</td>
//                   <td>{user.rollno}</td>
//                   <td>{user.SubjectSubCode}</td>
//                   <td>{user.date}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//         <Button variant="primary" onClick={handleClick}>
//           Primary
//         </Button>
//       </Container>
//     </>
//   );
// }
