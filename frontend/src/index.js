import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { AuthProvider } from "./component/context/UserContext";
import { NotifyProvider } from "./component/context/ToastContext";
// import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <NotifyProvider>
        <App />
      </NotifyProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pa++++++++++ss a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();
