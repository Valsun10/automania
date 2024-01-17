import React from "react";
import logo from "../../assets/Group 19448.png";
import profile from "../../assets/profile.png";
import profile2 from "../../assets/profile2.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const Header = () => {
  const { userInfo } = useGlobalContext();
  const { onLogout } = useGlobalContext();

  const fullName = localStorage.getItem("fullName");

  const headerDefaultLinks = (
    <>
      <Link to="/login" className="header-right-login">
        {fullName ? (
          <>
            <img src={profile2} alt="profile pic" onClick={() => onLogout()} />
            <p style={{ fontSize: "11px", textAlign: "center" }}>
              Hi,
              <br />
              {fullName}
            </p>
          </>
        ) : (
          <>
            <img src={profile} alt="profile pic" />
            <p className="login-btn">LOG IN</p>
          </>
        )}
      </Link>
      <Link to="/create" className="create-car">
        + ADD LISTING
      </Link>
    </>
  );

  const headerMobileLinks = (
    <>
      <Link to="/login" className="header-right-login">
        {fullName ? (
          <>
            <img src={profile2} alt="profile pic" onClick={() => onLogout()} />
            <p style={{ fontSize: "11px", textAlign: "center" }}>
              Hi,
              <br />
              {fullName}
            </p>
          </>
        ) : (
          <img src={profile} alt="profile pic" />
        )}
      </Link>
      <Link to="/create" className="create-car">
        +
      </Link>
    </>
  );

  return (
    <div className="header-container">
      <div className="header-left">
        <img src={logo} alt="logo" />
      </div>
      <div className="header-right">{headerDefaultLinks}</div>
      <div className="header-mobile">{headerMobileLinks}</div>
    </div>
  );
};

export default Header;
