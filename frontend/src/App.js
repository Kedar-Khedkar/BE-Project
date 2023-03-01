import "./App.css";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { ForgotPassword } from "./component/Login & Registration/Forget-Password";
import { ResetPassword } from "./component/Login & Registration/ResetPassword";
import ExtractUsers from "./component/ExtractUsers/ExtractUsers";
import DashBoard from "./pages/DashBoard";
import UserAccount from "./component/User Account/UserAccount";

// import { Container } from "react-bootstrap";
// import { RequireAuth } from "./component/ProtectedRoute/RequireAuth";
// import Notify from "./component/Toast/Notify";

// ------------------------------------Lazy Loading-----------------------------------
const LoginForm = React.lazy(() =>
  import("./component/Login & Registration/Login")
);
// const PasswordReset = React.lazy(() =>
//   import("./component/Login & Registration/ResetPassword")
// );
const UserAdd = React.lazy(() => import("./component/Add User/AddUser"));
const ErrorPage = React.lazy(() => import("./component/Error/ErrorPage"));
const Attendance = React.lazy(() => import("./component/Attendance/Layout"));
// const Subject = React.lazy(() => import("./component/Subjects/subject"))

// ------------------------------------Lazy Loading-----------------------------------
// const DropzoneBox = React.lazy(() =>
//   import("./component/Drop zone/Dropzone")
// );

// export function LoadingPage() {
//   return (
//     <Container
//       fluid
//       className={"jumbotron d-flex align-items-center min-vh-100"}
//     >
//       <div className="continuous-4"></div>
//     </Container>
//   );
// }

function App() {
  return (
    // <Suspense fallback={<LoadingPage />}>
    <div className="App">
      {/* <Notify/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<LoginForm />} />
          {<Route path="/forgot-password" element={<ForgotPassword />} />}
          {<Route path="/reset-password" element={<ResetPassword />} />}
          <Route path="/add-user" element={<UserAdd />} />
          {/* <Route path="/attendance" element={<RequireAuth><Attendance /></RequireAuth>} /> */}
          <Route path="/attendance" element={<Attendance />} />
          {/* <Route path="/claim-subject" element={<Subject />} /> */}
          <Route path="*" element={<ErrorPage />} />
          <Route path="/extractUsers" element={<ExtractUsers />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/my-account" element={<UserAccount />} />
        </Routes>
      </BrowserRouter>
    </div>
    // </Suspense>
  );
}

export default App;
