const loginURL = "https://automania.herokuapp.com/user/login";

const login = async (email, password) => {
  const response = await fetch(`${loginURL}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }
};

const authService = {
  login,
};

export default authService;
