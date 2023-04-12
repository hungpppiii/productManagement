import './App.css';
import Admin from "./displays/admin/Admin";
import Distributor from "./displays/distributor/Distributor";
import ManufactureFactory from "./displays/manufactureFactory/ManufactureFactory";
import ServiceCenter from "./displays/serviceCenter/ServiceCenter";
import SignIn from './displays/signIn/signIn';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate
} from "react-router-dom";
import { useContext,useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { UpdateSuccess } from './context/AuthActions';
function App() {
  const { user,dispatch } = useContext(AuthContext); 
  console.log(user ? user.typeAccount: "null");
  const app = (user) =>{
    if (!user){
      return(
    <Router>
    <Routes>
    <Route path = "/" element = { <SignIn />} />
    
    </Routes>
    </Router>)
      
    }
    if (user.typeAccount === "Admin"){
      return <Admin/>
    }
    if (user.typeAccount === "Distributor" ){
      return <Distributor/>
    }
    if (user.typeAccount === "Factory"){
      return <ManufactureFactory/>
    }
    if (user.typeAccount === "Servicecenter"){
      return <ServiceCenter/>
    }else{
      return(
        <Router>
        <Routes>
        <Route path = "/" element = { <SignIn />} />
        
        </Routes>
        </Router>)
    }

  }
  return (
    app(user)
  );
 
}

export default App;
