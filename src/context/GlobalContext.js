import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const initialState = {
  token: "",
  user: {
    _id: "",
    email: "",
    fullName: "",
  },
};

export const GlobalProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [carId, setCarId] = useState("");

  const getCarID = (carID) => {
    setCarId(carID);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onLogin = (authData) => {
    setUserInfo({
      token: authData.token,
      user: {
        _id: authData.user._id,
        email: authData.user.email,
        fullName: authData.user.fullName,
      },
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("fullName", authData.user.fullName);
  };

  const onLogout = () => {
    setUserInfo(initialState);
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
  };

  const value = {
    userInfo,
    onLogin,
    onLogout,
    openModal,
    closeModal,
    isModalOpen,
    isEdit,
    setIsEdit,
    carId,
    getCarID,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const globalState = useContext(GlobalContext);
  return globalState;
};
