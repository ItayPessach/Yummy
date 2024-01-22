import { useUserContext } from "@/common/context/useUserContext";
import { Navigate } from "react-router-dom";
import usersService from "@/services/usersService";

interface Props {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
  const { user } = useUserContext();

  // We use this function because after a refresh, the user is not yet set in the context.
  const isLoggedIn = () => {
    if (!user) {
      const { request } = usersService.getMe();

      request
        .then((res) => {
          if (!res.data) {
            return false;
          }

          return true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return true;
  };

  return isLoggedIn() ? children : <Navigate to="/login" replace={true} />;
};

export default RequireAuth;
