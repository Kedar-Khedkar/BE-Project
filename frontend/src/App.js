import "./App.css";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { ForgotPassword } from "./component/Login & Registration/Forget-Password";
import { ResetPassword } from "./component/Login & Registration/ResetPassword";
import Dashboard from "./component/Dashboard/Dashboard";
import MyAccount from "./pages/MyAccount";
import HeaderAction from "./component/Dashboard/Header";
import UserTabs from "./pages/UserTabs";
import AttendanceTabs from "./pages/AttendanceTabs";
import Subjects from "./pages/Subjects";
import AuthenticatedRoute from "./Authentication/AuthenticatedRoute";
import PreventReLogin from "./Authentication/PreventReLogin";
import AdminRoute from "./Authentication/AdminRoute";
import FacultyOrAdminRoute from "./Authentication/FacultyOrAdminRoute";

const LoginForm = React.lazy(() =>
  import("./component/Login & Registration/Login")
);
const ErrorPage = React.lazy(() => import("./component/Error/ErrorPage"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderAction />
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/"
            element={
              <PreventReLogin>
                <LoginForm />
              </PreventReLogin>
            }
          />
          {<Route path="/forgot-password" element={<ForgotPassword />} />}
          {<Route path="/reset-password" element={<ResetPassword />} />}
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/user-mgmt/:tabValue"
            element={
              <AuthenticatedRoute>
                <AdminRoute>
                  <UserTabs />
                </AdminRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/attend-mgmt/:tabValue"
            element={
              <AuthenticatedRoute>
                <FacultyOrAdminRoute>
                  <AttendanceTabs />
                </FacultyOrAdminRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/subject-mgmt/:tabValue"
            element={
              <AuthenticatedRoute>
                <FacultyOrAdminRoute>
                  <Subjects />
                </FacultyOrAdminRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/my-account"
            element={
              <AuthenticatedRoute>
                <MyAccount />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
