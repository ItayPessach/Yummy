import { useUserContext } from "@/common/context/useUserContext";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
  const { user } = useUserContext();

  return user ? children : <Navigate to="/login" replace={true} />;
};

export default RequireAuth;
