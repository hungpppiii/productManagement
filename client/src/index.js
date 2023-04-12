import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./displays/admin/Admin";
import Distributor from "./displays/distributor/Distributor";
import ManufactureFactory from "./displays/manufactureFactory/ManufactureFactory";
import ServiceCenter from "./displays/serviceCenter/ServiceCenter";
import SignIn from './displays/signIn/signIn';
import {AuthContextProvider} from './context/AuthContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
const user = {
  name: "quyet",
  typeAccount: "Admin",
};

root.render(
  // React.StrictMode
  // <>
  //   {user.typeAccount === "Admin" && <Admin />}
  //   {user.typeAccount === "Distributor" && <Distributor />}
  //   {user.typeAccount === "ManufactureFactory" && <ManufactureFactory />}
  //   {user.typeAccount === "ServiceCenter" && <ServiceCenter />}
  //   {user.typeAccount === "guest" && <SignIn/>}
  // </>
  <React.StrictMode>
  <AuthContextProvider>
    <App/>
  </AuthContextProvider>
  </React.StrictMode>
);
