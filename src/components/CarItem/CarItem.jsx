import React, { useState } from "react";
import "./CartItem.css";
import setting from "../../assets/setting.png";
import pencil from "../../assets/pencil.png";
import delIcon from "../../assets/delete.png";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const CarItem = ({ car, setCars, cars }) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const { model, price, mainPhoto, _id, user } = car;
  const navigate = useNavigate();

  const toggleMenu = () => {
    setDropdownMenu((state) => !state);
  };

  const { openModal, setIsEdit, getCarID } = useGlobalContext();
  const userName = localStorage.getItem("fullName");

  return (
    <>
      <div className="dashboard-car-item">
        <div className="dashboard-car-item-img">
          <img src={mainPhoto} alt="car" />
          {userName === user.fullName ? (
            <>
              <div className="manage" onClick={toggleMenu}>
                <img
                  src={setting}
                  alt="settings"
                  style={{ width: "15px", height: "15px" }}
                />
                Manage
              </div>
              {!dropdownMenu ? (
                <></>
              ) : (
                <div className="dropdown-menu scale-up-center">
                  <div className="dropdown-menu-container">
                    <div
                      className="edit"
                      onClick={() => {
                        setIsEdit(true);
                        navigate(`/create/${_id}`);
                      }}
                    >
                      <img
                        src={pencil}
                        alt="edit"
                        style={{
                          width: "15px",
                          height: "15px",
                          objectFit: "contain",
                        }}
                      />{" "}
                      Edit listing
                    </div>
                    <div
                      className="delete"
                      onClick={() => {
                        openModal();
                        getCarID(_id);
                      }}
                    >
                      <img
                        src={delIcon}
                        alt="delete"
                        style={{
                          width: "15px",
                          height: "15px",
                          objectFit: "contain",
                        }}
                      />{" "}
                      Delete listing
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="dashboard-car-item-heading">
          <h3>{model}</h3>
          <p className="price">{price} BGN</p>
        </div>
      </div>
    </>
  );
};

export default CarItem;
