import { useUserContext } from "@/context/useUserContext";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
  const { user, setUser } = useUserContext();

  const isLoggedIn = () => {
    if (user) {
      return true;
    } else {
      // TODO: get user _id from the token (localStorage or cookie) and fetch user from server
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        setUser({
          _id: "123",
          username: "HASOS",
          fullname: "Itay Hasson",
          email: "123@123.123",
          homeCity: "Tel Aviv",
          token: "123",
        });
        return true;
      } else {
        return false;
      }
    }
  };

  return isLoggedIn() ? children : <Navigate to="/login" replace={true} />;
};

export default RequireAuth;
