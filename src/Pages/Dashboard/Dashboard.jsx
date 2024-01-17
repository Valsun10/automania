import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import CarItem from "../../components/CarItem/CarItem";
import carsService from "../../services/CarsService";
import LoadingSpinner from "./../../components/LoadingSpinner/LoadingSpinner";
import { useGlobalContext } from "../../context/GlobalContext";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isModalOpen, closeModal, carId } = useGlobalContext();

  const carsLenght = cars.length;
  const token = localStorage.getItem("token");

  const handleDelete = (carID) => {
    carsService.deleteCar(carID, token).then((res) => {
      if (res.success) {
        const updatedCarList = cars.filter((car) => car._id !== carID);
        setCars(updatedCarList);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await carsService.fetchAllCars(1, 12);
        setCars(res);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />

      <div className="wrapper">
        <div className="dashboard-container">
          <div className="dashboard-heading">
            <h1>CAR LISTINGS ({carsLenght})</h1>
          </div>
          <div className="dashboard-cars-container">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              cars.map((car) => (
                <CarItem key={car.id} car={car} setCars={setCars} cars={cars} />
              ))
            )}
          </div>
        </div>
      </div>
      {!isModalOpen ? (
        <></>
      ) : (
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-heading">
              <h1>DELETE LISTING</h1>
              <p>
                Are you sure you want to delete this listing from the platform?
              </p>
            </div>
            <div className="modal-btn-container">
              <button className="close-modal" onClick={() => closeModal()}>
                GO BACK
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  handleDelete(carId);
                  closeModal();
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
