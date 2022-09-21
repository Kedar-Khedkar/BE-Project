import "./App.css";
import './index.css'
import "./bootstrap.scss";
import { BrowserRouter, Route, Redirect, Routes } from "react-router-dom";
import React, { useEffect, useState, Suspense } from "react";
// import Form from "./component/Login & Registration/Login";
// import PasswordReset from "./component/Login & Registration/ResetPassword";
// import UserAdd from "./component/Login & Registration/AddUser";
// import DropzoneBox from './component/Drop zone/Dropzone'

const LoginForm = React.lazy(() =>
  import("./component/Login & Registration/Login")
);
const PasswordReset = React.lazy(() =>
  import("./component/Login & Registration/ResetPassword")
);
const UserAdd = React.lazy(() =>
  import("./component/Add User/AddUser")
);
// const DropzoneBox = React.lazy(() =>
//   import("./component/Drop zone/Dropzone")
// );
function App() {
  return (
    <Suspense
    // fallback={ }
    >
      <div className='App'>
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
