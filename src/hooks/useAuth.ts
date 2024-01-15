export const useAuth = () => {
  const getToken = () => localStorage.getItem("token");

  // TODO: change all this
  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", "123");
  };

  return {
    getToken,
    setToken,
  };
};
