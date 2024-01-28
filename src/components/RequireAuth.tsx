import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import userStore from "@/common/store/user.store";
import usersService from "@/services/usersService";

interface Props {
  children: React.ReactNode;
}

const RequireAuth = observer(({ children }: Props) => {
  const { user, setUser } = userStore;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { request, cancel } = usersService.getMe();

    request
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      cancel();
    };
  }, [setUser]);

  return (
    !loading && (user ? children : <Navigate to="/login" replace={true} />)
  );
});

export default RequireAuth;
