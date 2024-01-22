import { ReactNode, useEffect, useState } from "react";
import { User } from "@/common/types";
import { UserContext } from "./useUserContext";
import { fetchUser } from "@/api/user";

interface UserContextProviderProps {
  children: ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userFromDb = fetchUser();
    if (userFromDb) {
      setUser({
        _id: "123",
        fullname: "Itay Hasson",
        email: "hasos@gmail.com",
        homeCity: "Tel Aviv",
        token: "123",
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
