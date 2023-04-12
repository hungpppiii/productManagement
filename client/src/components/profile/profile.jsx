import "./profile.css";
import avatar from "../../cat.jpg";
import React, { useState } from "react";

import { FaRegTimesCircle, FaUserCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = ({ title }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  return (
    <>
      {/* onClick={toggleShowProfile} */}
      <div className="top" title={title} onClick={toggleShowProfile}>
        <img className="avatar" src={avatar} alt="" />
      </div>

      {showProfile && (
        <div className="model">
          <div onClick={toggleShowProfile} className="overlay"></div>
          <div className="content">
            <div className="avatarWrapper">
              <img className="avatar2" src={avatar} alt="" />
            </div>
            <h3>Username: {user.username}</h3>
            <h3>Name: {user.name}</h3>
            <h3>ID: {user._id}</h3>
            <h3>Location: {user.location}</h3>
            <h3>Type account: {user.typeAccount}</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
