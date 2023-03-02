import React, { useState, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

export default function AdminRoute(props) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const checkUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role !== "admin") {
      setIsAdmin(false);
      return navigate("/dashboard");
    }
    setIsAdmin(true);
  };

  useEffect(() => {
    checkUserRole();
  }, [isAdmin]);
  return <React.Fragment>{isAdmin ? props.children : null}</React.Fragment>;
}
