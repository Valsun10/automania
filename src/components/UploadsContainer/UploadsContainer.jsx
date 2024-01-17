import React, { useState } from "react";
import plus from "../../assets/plus.png";
import "./UploadsContainer.css";
import { useGlobalContext } from "../../context/GlobalContext";

const UploadsContainer = ({
  mainPhoto,
  setMainPhoto,
  additionalPhotos,
  setAdditionalPhotos,
}) => {
  const token = localStorage.getItem("token");

  const handleUpload = async (photo) => {
    let formData = new FormData();
    formData.append("images", photo);

    const response = await fetch(
      "https://automania.herokuapp.com/file/upload",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return data;
  };

  const handleOnChangeMainPhoto = (e) => {
    handleUpload(e.target.files[0]).then((res) =>
      setMainPhoto(res.payload[0].url)
    );
  };

  const handleOnChangeAdditionalPhotos = (e) => {
    setAdditionalPhotos(e.target.files[0]);
  };

  return (
    <div className="uploads-container">
      <div className="uploads-left">
        <h3>Main photo</h3>
        <div className="main-photo-container">
          <div className="upload-btn">
            <img src={plus} alt="add" />
            <label htmlFor="mainPhoto">UPLOAD</label>
            <input
              type="file"
              id="mainPhoto"
              style={{ display: "none" }}
              onChange={handleOnChangeMainPhoto}
            />
          </div>
          {mainPhoto ? <div className="upload-result">{mainPhoto}</div> : <></>}
        </div>
      </div>
      <div className="uploads-right">
        <h3>Additional photos</h3>
        <div className="additional-photo-container">
          <div className="upload-btn">
            <img src={plus} alt="add" />
            <label htmlFor="additionalPhotos">UPLOAD</label>
            <input
              type="file"
              id="additionalPhotos"
              style={{ display: "none" }}
              onChange={handleOnChangeAdditionalPhotos}
            />
          </div>
          {additionalPhotos ? (
            <div className="upload-result">{additionalPhotos.name}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadsContainer;
