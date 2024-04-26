
import {Link} from 'react-router-dom'
import Logo from "../Images/logo 3.jpg"
import { AuthContext } from "../Context/authContext.jsx";
import React, { useContext } from "react";

const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className='links'>
        <Link className="link" to="/?cat=environmental">
            <h6>ENVIRONMENTAL</h6>
          </Link>
          <Link className="link" to="/?cat=health">
            <h6>HEALTH</h6>
          </Link>
          <Link className="link" to="/?cat=education">
            <h6>EDUCATION</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=other">
            <h6>OTHER</h6>
          </Link>
          <Link className="link" to="/?cat=business">
            <h6>BUSINESS</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className='write'>
            <Link className="link" to="/post">Post</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar