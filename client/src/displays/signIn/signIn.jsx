import './signIn.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useContext, useRef,useEffect,useState } from "react";
import Slider from './slider/slider'
import {BsFillPersonFill} from 'react-icons/bs'
import {RiLockPasswordFill} from 'react-icons/ri'
import { loginCall } from '../../loginCall';
import { AuthContext } from "../../context/AuthContext";


export default function SignIn() {
  const username= useRef();
  const password= useRef();
  const [formWarning,setFormWarning]= useState("");

  const {error,dispatch} =useContext(AuthContext);
  const handleSubmit = (e)=>{
    e.preventDefault();
    const userCredentials= {username:username.current.value,password:password.current.value};
    console.log(userCredentials);
    loginCall(userCredentials,dispatch);
    
  };
  useEffect(()=>{
    if(username.current.value =="" ||password.current.value ==""){
      setFormWarning("Yêu cầu username và password")
    }
    if(error==true && username.current.value !="" && password.current.value !="" ){
      setFormWarning("Có gì đó sai sai. Vui lòng thử lại")
    }
  },[error]);
  const handleChange = () =>{
    setFormWarning("");
    password.current.value = "";
  }
  const handleFocus= ()=>{
    setFormWarning("");
  }
  return (
      <div className="signIn">
        <div className="signInWrapper">
          
          <div className="signInContainer">
            <div className="signInContent">
  
              <div className= "signInHeader">
                <h4 className="signInTitle">Production Move</h4>
                <h4>Sign In</h4>
                <Slider className = "slider"/>
              </div>
              <div className="signInForm">
                <div className="signInFormContainer">
  
                  <form className="signInBox" 
                  
                  >
                    <div>
                    {/* <span className='spanSI'>Username</span> */}
                    <BsFillPersonFill className="iconSignin"/>
                    <input placeholder="Username" required 
                    className="signInInput" 
                    ref={username} 
                    onChange = {handleChange}
                    onFocus={handleFocus} 
                    />
                    </div>
                    <div>
                      {/* <span className='spanSI'>Password</span> */}
                      <RiLockPasswordFill className='iconSignin'/>
                      <input
                      placeholder="Password"
                      type="password"
                      required
                      className="signInInput"
                      ref={password}
                      onChange = {()=>{setFormWarning("")}}
                      onFocus={handleFocus}
                    />
                    </div>
                
                    <h4>
                      {formWarning}
                    </h4>
                    <button className="signInButton" type="submit"
                     onClick={handleSubmit}
                    >
                      Sign In
                    </button>
                  </form>
                  {/* <ToastContainer /> */}
                </div>
              </div>
              <div className="signInFooter">
                <p>© 2022 Produce Move by Pro-team</p>
              </div>
  
              
  
            </div>
            
            
          </div>
          
        </div>
      </div>
      
    );
  }
  