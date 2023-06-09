import './manufactureFactory.css';
import Navbar from '../../components/navbar/navbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Statistical from './pages/statistical/statistical';
import Products from './pages/products/products';
import Defectives from './pages/defectiveProducts/defective';
import Warehouse from './pages/warehouse/warehouse';

export default function ServiceCenter() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Statistical />} />
          <Route path="/product" element={<Products />} />
          <Route path="/defective" element={<Defectives />} />
          {/* <Route path="/warehouse" element={<Warehouse />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
