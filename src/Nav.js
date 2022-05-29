import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectUser} from "./features/userSlice";
import "./Nav.css";
function Nav() {
  const [show, handleShow] = useState(false);
  const history=useHistory();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll",null);
    };
  }, []);
  const user=useSelector(selectUser);
  return (
      <div className={`nav ${show && "nav__black"}`}>
        <img
          onClick={(e)=>{history.push('/');window.location.reload();}}
          className="nav__logo"
          src="/images/misc/cinemaos.png"
          alt="Netflix Logo"
        />
        <h2 className="nav__font">{user.email}</h2>
        <img
        onClick={(e)=>{history.push('/profile');window.location.reload();}}
          className="nav__avatar"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
          alt="Netflix Logo"
        />
      </div>
    )
}

export default Nav