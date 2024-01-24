import { ReactNode, useEffect, useState } from "react";
import { IUser } from "@/common/types";
import { UserContext } from "./useUserContext";
import usersService from "@/services/usersService";
interface UserContextProviderProps {
  children: ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
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
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
