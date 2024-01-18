export const fetchUser = () => {
  // TODO: get user _id from the token (localStorage or cookie) and fetch user from server
  const userFromLocalStorage = localStorage.getItem("user");
  if (userFromLocalStorage) {
    return JSON.parse(userFromLocalStorage);
  }

  return null;
};
