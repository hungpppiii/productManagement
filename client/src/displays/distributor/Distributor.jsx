
import './distributor.css'
import {
    BrowserRouter as Router,
    Routes,
    Route, 
    Navigate
} from "react-router-dom";

import Statistical from './pages/Statistical/statistical';
import Order from './pages/Orders/order';
import Products from './pages/Products/products';
import RecallProductions from './pages/Recallproductions/recallProductions';

export default function Distributor() {
    return(
        <div className="container">
            <Router>
                <Routes>
                    <Route path='/' element = {<Statistical/>}/>
                    <Route path='/products' element = {<Products/>}/>
                    <Route path='/recallProductions' element = {<RecallProductions/>}/>
                    <Route path='/order' element = {<Order/>}/>
                </Routes>
            </Router>
        </div>
    );
}