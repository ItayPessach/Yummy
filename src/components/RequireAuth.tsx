import { fetchUser } from "@/api/user";
import { useUserContext } from "@/common/context/useUserContext";
import { Navigate } from "react-router-dom";
// import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
  //   const { getToken } = useAuth();
  const { user } = useUserContext();

  // We use this function because after a refresh, the user is not yet set in the context.
  const isLoggedIn = () => {
    if (!user) {
      const userFromDb = fetchUser(); // getToken();
      if (!userFromDb) {
        return false;
      }
    }
    return true;
  };

  return isLoggedIn() ? children : <Navigate to="/login" replace={true} />;
};

export default RequireAuth;
