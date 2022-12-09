import "./App.css";
import "./index.css";
import "./bootstrap.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

import { Container } from "react-bootstrap";
import { RequireAuth } from "./component/ProtectedRoute/RequireAuth";

// ------------------------------------Lazy Loading-----------------------------------
const LoginForm = React.lazy(() =>
  import("./component/Login & Registration/Login")
);
const PasswordReset = React.lazy(() =>
  import("./component/Login & Registration/ResetPassword")
);
const UserAdd = React.lazy(() => import("./component/Add User/AddUser"));
const ErrorPage = React.lazy(() => import("./component/Error/ErrorPage"));
const Attendance = React.lazy(() => import("./component/Attendance/Attendance"));

// ------------------------------------Lazy Loading-----------------------------------
// const DropzoneBox = React.lazy(() =>
//   import("./component/Drop zone/Dropzone")
// );

export function LoadingPage() {
  return (
    <Container
      fluid
      className={"jumbotron d-flex align-items-center min-vh-100"}
    >
      <div className="continuous-4"></div>
    </Container>
  );
}

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<LoginForm />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/add-user" element={<UserAdd />} />
            <Route path="/attendance" element={<RequireAuth><Attendance /></RequireAuth>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
