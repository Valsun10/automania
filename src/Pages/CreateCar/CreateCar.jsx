import React, { useEffect, useState } from "react";
import "./CreateCar.css";
import Header from "../../components/Header/Header";
import closeBTN from "../../assets/Group 19454.png";
import { useNavigate, useParams } from "react-router-dom";
import UploadsContainer from "../../components/UploadsContainer/UploadsContainer";
import carsService from "../../services/CarsService";
import { useGlobalContext } from "../../context/GlobalContext";

const CreateCar = () => {
  const navigate = useNavigate();
  const [mainPhoto, setMainPhoto] = useState("");
  const [additionalPhotos, setAdditionalPhotos] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const { carID } = useParams();
  const token = localStorage.getItem("token");
  const { isEdit, setIsEdit } = useGlobalContext();

  const resetInputs = () => {
    setMainPhoto("");
    setBrand("");
    setModel("");
    setPrice("");
    setAdditionalPhotos("");
  };

  const handleCreate = () => {
    carsService
      .createCar(token, brand, model, price, mainPhoto)
      .then((res) => {
        resetInputs();
        setErrorMessage(null);
        alert("Car has been created!");
      })
      .catch((error) => {
        setErrorMessage("You are missing dependencies!");
      });
  };

  const handleEdit = () => {
    carsService
      .editSingleCar(carID, token, brand, model, price, mainPhoto)
      .then((res) => {
        setErrorMessage("");
        alert("Car has been edited!");
        setIsEdit(false);
      })
      .catch((err) => {
        setErrorMessage("You are missing dependencies!");
      });
  };

  useEffect(() => {
    if (isEdit) {
      carsService.getSingleCar(carID).then((res) => {
        setBrand(res.payload.brand);
        setModel(res.payload.model);
        setPrice(res.payload.price);
        setMainPhoto(res.payload.mainPhoto);
      });
    }
  }, []);

  return (
    <>
      <Header />

      <div className="wrapper-create">
        <div className="create-container">
          <div className="create-heading">
            <div className="heading-left">
              <img
                src={closeBTN}
                alt="closebutton"
                onClick={() => {
                  setIsEdit(false);
                  navigate("/");
                }}
              />
              {!isEdit ? <h1>NEW LISTING</h1> : <h1>EDIT LISTING</h1>}
            </div>
            <div className="heading-right">
              {!isEdit ? (
                <button onClick={handleCreate}>CREATE LISTING</button>
              ) : (
                <button onClick={handleEdit}>EDIT LISTING</button>
              )}
            </div>
          </div>
          <div className="create-content">
            <h1>GENERAL INFORMATION</h1>
            <div className="create-inputs-container">
              <div>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                />
              </div>
              <div>
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  onChange={(e) => setModel(e.target.value)}
                  value={model}
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <div className="price-input">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                  <span className="bgn">BGN</span>
                </div>
              </div>
            </div>
            <div className="hr" />
          </div>
          <div className="create-upload">
            <h3>PHOTOS</h3>
            <UploadsContainer
              mainPhoto={mainPhoto}
              setMainPhoto={setMainPhoto}
              additionalPhotos={additionalPhotos}
              setAdditionalPhotos={setAdditionalPhotos}
            />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {!isEdit ? (
            <button className="mobile-add" onClick={handleCreate}>
              CREATE LISTING
            </button>
          ) : (
            <button className="mobile-add" onClick={handleEdit}>
              EDIT LISTING
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCar;
