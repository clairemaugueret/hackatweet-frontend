import BACKEND_URL from "./config";

//INSCRIPTION
export const signIn = async (username, password) => {
  const res = await fetch(`${BACKEND_URL}/users/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

//CONNEXION
export const signUp = async (firstname, username, password) => {
  const res = await fetch(`${BACKEND_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstname, username, password }),
  });
  return res.json();
};

//PROFILE UPDATES
export const updateFirstname = async (token, firstname) => {
  const res = await fetch(`${BACKEND_URL}/users/firstname`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, firstname }),
  });
  return res.json();
};

export const updateProfilePicture = async (token, image) => {
  const res = await fetch(`${BACKEND_URL}/users/picture`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, image }),
  });
  return res.json();
};
