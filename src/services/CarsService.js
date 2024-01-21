const allCarsURL = "https://automania.herokuapp.com/listing/list";
const createCarsURL = "https://automania.herokuapp.com/listing/create";
const deleteCarsURL = "https://automania.herokuapp.com/listing";
const singleCarsURL = "https://automania.herokuapp.com/listing";
const editCarURL = "https://automania.herokuapp.com/listing";

const fetchAllCars = async (pageNumber, pageSize) => {
  const response = await fetch(`${allCarsURL}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ pageNumber, pageSize }),
  });

  const carsData = await response.json();

  if (response.ok) {
    return carsData.payload.docs;
  }
};

const createCar = async (
  token,
  brand,
  model,
  price,
  mainPhoto,
  additionalPhotos
) => {
  const response = await fetch(`${createCarsURL}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ brand, model, price, mainPhoto, additionalPhotos }),
  });

  const carsData = await response.json();

  if (!response.ok) {
    throw new Error("You are missing dependencies!");
  } else {
    return carsData.payload;
  }
};

const deleteCar = async (carID, token) => {
  const response = await fetch(`${deleteCarsURL}/${carID}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResult = response.json();
  return jsonResult;
};

const getSingleCar = async (carID) => {
  const response = await fetch(`${singleCarsURL}/${carID}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  const jsonResult = response.json();
  return jsonResult;
};

const editSingleCar = async (
  carID,
  token,
  brand,
  model,
  price,
  mainPhoto,
  additionalPhotos
) => {
  const response = await fetch(`${editCarURL}/${carID}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ brand, model, price, mainPhoto, additionalPhotos }),
  });

  const jsonResult = await response.json();

  if (!response.ok) {
    throw new Error("You are missing dependencies!");
  } else {
    return jsonResult;
  }
};

const carsService = {
  fetchAllCars,
  createCar,
  deleteCar,
  getSingleCar,
  editSingleCar,
};

export default carsService;
