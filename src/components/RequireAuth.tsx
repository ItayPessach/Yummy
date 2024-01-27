import userStore from "@/common/store/user.store";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const RequireAuth = observer(({ children }: Props) => {
  const { user } = userStore;

  // TODO: wait until user is loaded for refreshes
  return user ? children : <Navigate to="/login" replace={true} />;
});

export default RequireAuth;
