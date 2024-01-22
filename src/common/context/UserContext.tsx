import { ReactNode, useEffect, useState } from "react";
import { User } from "@/common/types";
import { UserContext } from "./useUserContext";
import usersService from "@/services/usersService";

interface UserContextProviderProps {
  children: ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { request, cancel } = usersService.getMe();

    request
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      cancel();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
