import './serviceCenter.css';
import Navbar from '../../components/navbar/navbar';

import {
    BrowserRouter as Router,
    Routes,
    Route, 
    Navigate
  } from "react-router-dom";
import Statistical from './pages/statistical/statistical';
import Products from './pages/products/products';


export default function ServiceCenter() {
    return(
        <div className="container4">
            <Router>
                <Routes>
                    <Route path='/' element = {<Statistical/>}/>
                    <Route path='/product' element = {<Products/>}/>
                </Routes>
            </Router>
        </div>
    );
}