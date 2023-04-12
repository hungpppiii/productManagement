import "./sidebar.css";
import { NavLink } from "react-router-dom";
import Profile from "../../../../components/profile/profile";
import avatar from "../../../../cat.jpg";

import { MdDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";

import { useState, useEffect } from "react";

export default function Sidebar() {
  const title = "Admin";

  return (
    <div className="sidebar">
      <Profile {...{ title }} />

      <div className="center">
        <ul>
          <NavLink style={{ textDecoration: "none" }} to="/">
            <li title="Statistical">
              <MdDashboard className="icon" />
              <span>Statistical</span>
            </li>
          </NavLink>

          <NavLink style={{ textDecoration: "none" }} to="/product">
            <li title="product">
              <RiProductHuntLine className="icon" />
              <span>Product</span>
            </li>
          </NavLink>

          <NavLink style={{ textDecoration: "none" }} to="/productLine">
            <li title="productLine">
              <AiOutlineUnorderedList className="icon" />
              <span>ProductLine</span>
            </li>
          </NavLink>

          <NavLink style={{ textDecoration: "none" }} to="/accountManagement">
            <li title="accountManagement">
              <BsPerson className="icon" />
              <span>Account</span>
            </li>
          </NavLink>
        </ul>
      </div>

      <div className='logout' title='log out'>
                {/* <FiLogOut className='iconlogout3' /> */}
                <button onClick={() => {
                    localStorage.clear()
                    window.location.href = "http://localhost:3000/"
                }}>
                    <div className='logoutWrap'>
                        <FiLogOut className='iconlogout' />
                        Log Out
                    </div>
                </button>
            </div>
    </div>
  );
}
