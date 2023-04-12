import "./admin.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Statistical from "./pages/statistical/statistical";
import Accounts from "./pages/accounts/accounts";
import Products from "./pages/products/products";
import ProductLine from "./pages/productLine/productLine";

import avatar from "../../cat.jpg";
import { useState } from "react";

export default function Admin() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Statistical />} />
          <Route path="/accountManagement" element={<Accounts />} />
          <Route path="/product" element={<Products />} />
          <Route path="/productLine" element={<ProductLine />} />
        </Routes>
      </Router>
    </div>
  );
}
