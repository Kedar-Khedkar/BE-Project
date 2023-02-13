// /* The above code is a React component that is used to upload a file to the server. */
// import React, { useState, useMemo } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from "axios";
// import TableGen from "../Table/Table";
// import {
//   Row,
//   Form,
//   Button,
//   Toast,
//   ToastContainer,
//   Container,
// } from "react-bootstrap";
// import ErrorModal from "../Add User/Modal";
// import { useNotify } from "../context/ToastContext";

// const baseStyle = {
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   padding: "20px",
//   borderWidth: 2,
//   borderRadius: 2,
//   borderColor: "#535886",
//   borderStyle: "dashed",
//   backgroundColor: "#24263a",
//   color: "#bdbdbd",
//   outline: "none",
//   transition: "border .24s ease-in-out",
// };
// const focusedStyle = {
//   borderColor: "#2196f3",
// };

// const acceptStyle = {
//   borderColor: "#00e676",
// };

// const rejectStyle = {
//   borderColor: "#ff1744",
// };

// export default function Dropzone(props) {
//   const [show, setShow] = useState(false);
//   const notify = useNotify();

//   let data={}
//   // const initialErrorValue = [];
//   // const initialErrorValue = [];
//   const [showModal, setShowModal] = useState(false);
//   const [errors, setErrors] = useState(undefined);

//   // const handleShow = () => setShowModal(true);
//   // const [variant,setVariant]=useState('dark')
//   const {
//     getRootProps,
//     getInputProps,
//     open,
//     acceptedFiles,
//     isFocused,
//     isDragAccept,
//     isDragReject,
//   } = useDropzone({
//     // Disable click and keydown behavior
//     noClick: true,
//     multiple: false,
//     noKeyboard: true,
//     accept: {
//       " application/vnd.ms-excel": [".xls"],
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
//         ".xlsx",
//       ],
//       "text/csv": [".csv"],
//       "application/vnd.oasis.opendocument.spreadsheet": [".ods"],
//     },
//     onDropAccepted: (Notification) => {
//       // setShow(true);
//       notification()
//       notify.addData(data)
//       notify.showController(true);

//       // setVariant('dark')
//     },
//     // onDropRejected: (Notification) => {
//     //   setShow(true);
//     //   setVariant('danger');
//     // },
//   });
//  /* A function that is used to set the style of the dropzone. */
//   const style = useMemo(
//     () => ({
//       ...baseStyle,
//       ...(isFocused ? focusedStyle : {}),
//       ...(isDragAccept ? acceptStyle : {}),
//       ...(isDragReject ? rejectStyle : {}),
//     }),
//     [isFocused, isDragAccept, isDragReject]
//   );

//   const files = acceptedFiles.map((file) => file.path);

//   const handleErrors = (values) => {
//     setErrors(values);
//   };

//   const onConfirm = () => {
//     setErrors(undefined);
//   };

//   const notification = () => {
//     data.body=`${files}uploaded successfully`
//    }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     var formData = new FormData();
//     formData.append("file", acceptedFiles[0]);
// axios
//   .post("http://localhost:5000/users/upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   })
//       // .then(function (response) {
//       //   const result = response.data;
//       //   if (result.result === "SUCCESS") {
//       //     console.log(result.msg);
//       //   } else {
//       //     console.log(result.errdata);

//       //     handleErrors(result.errdata);
//       //     // console.log('erros: ',errors);
//       //     setShowModal(true);
//       //   }
//       // });
//       .then(function(response){
//         if(response.data.status==="success"){
//           console.log(response.data.data)
//         }
//         else{
//           console.log(response.data.err)
//           handleErrors(response.data.err)
//           setShowModal(true);
//         }
//       })
//     // console.log(acceptedFiles[0]);
//   };
//   return (
//     <>
//       {/* A container that is used to wrap the form and the error modal.  */}
//       <Container className="mt-3 mb-3">
//         {errors && (
//           <ErrorModal show={showModal} onHide={onConfirm}>

//             <TableGen errors={errors} />
//           </ErrorModal>
//         )}
//         {/*  A form that is used to upload a file to the server. */ }
//         <Form onSubmit={handleSubmit}>
//           <div {...getRootProps({ className: "dropzone", style })}>
//             <input {...getInputProps()} />
//             <div className="text-center mb-4 mt-4">
//               <Button variant="primary" onClick={open} className={""}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   fill="currentColor"
//                   className="bi bi-cloud-upload-fill me-2"
//                   viewBox="0 0 16 16"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0z"
//                   />
//                 </svg>
//                 Upload from PC or Mobile
//               </Button>
//             </div>
//             <p className="text-center">or Drag files here</p>
//           </div>

//           <div>
//             <Row className="mt-3 ">
//               <Button variant="primary" type="submit" role="submit">
//                 Add User
//               </Button>
//             </Row>
//           </div>
//         </Form>
//       </Container>

//       {/* <ToastContainer position="bottom-end">
//         <Toast
//           onClose={() => notify.showController(false)}
//           show={show}
//           delay={3000}
//           autohide
//           bg="success"
//         >
//           <Toast.Header>
//             <img
//               src="holder.js/20x20?text=%20"
//               className="rounded me-2"
//               alt=""
//             />
//             <strong className="me-auto">Bootstrap</strong>
//             <small>11 mins ago</small>
//           </Toast.Header>
//           <Toast.Body>{files} uploaded successfully</Toast.Body>
//         </Toast>
//       </ToastContainer> */}
//     </>
//   );
// }

import { Button, Text } from "@mantine/core";
import { Dropzone, MS_EXCEL_MIME_TYPE } from "@mantine/dropzone";
import axios from "axios";
import { useState } from "react";

export default function DropzoneButton() {
  const [uploaded, setUploaded] = useState(undefined);

  const upload = () => {
    const formData = new FormData();

    formData.append("file", uploaded[0]);

    axios
      .post("http://localhost:5000/users/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Dropzone
        onDrop={(files) => setUploaded(files)}
        onReject={(files) => console.log("rejected files", files)}
        accept={MS_EXCEL_MIME_TYPE}
        sx={(theme) => ({
          minHeight: 120,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: 0,
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],

          "&[data-accept]": {
            color: theme.white,
            backgroundColor: theme.colors.blue[6],
          },

          "&[data-reject]": {
            color: theme.white,
            backgroundColor: theme.colors.red[6],
          },
        })}
      >
        <Text align="center">Drop images here</Text>
      </Dropzone>
      <Button onClick={upload}>Upload</Button>
    </>
  );
}
