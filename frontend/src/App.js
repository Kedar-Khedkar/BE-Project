import "./App.css";
import "./bootstrap.scss";
import { BrowserRouter, Route, Redirect, Routes } from "react-router-dom";
import React, { useEffect, useState, Suspense } from "react";
// import Form from "./component/Login & Registration/Login";
import PasswordReset from "./component/Login & Registration/ResetPassword";
import UserAdd from "./component/Login & Registration/AddUser";
// import DropzoneBox from './component/Drop zone/Dropzone'

const LoginForm = React.lazy(() =>
  import("./component/Login & Registration/Login")
);
function App() {
  return (
    <Suspense
    // fallback={ }
    >
      <div>
        <BrowserRouter>
          <Routes>

            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<LoginForm />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/add-user" element={<UserAdd />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Suspense>
  );
}

export default App;
