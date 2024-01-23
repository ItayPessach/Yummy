import { ReactNode, useEffect, useState } from "react";
import { User } from "@/common/types";
import { UserContext } from "./useUserContext";
import usersService from "@/services/usersService";
import authService from "@/services/authService";

interface UserContextProviderProps {
  children: ReactNode;
}

function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { request, cancel } = usersService.getMe();

    request
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          // TODO: check if it's working
          const { request } = authService.refresh();

          request
            .then((res) => {
              document.cookie = `access_token=${res.data.accessToken}; path=/`;
              document.cookie = `refresh_token=${res.data.refreshToken}; path=/`;

              const { request } = usersService.getMe();

              request.then((res) => {
                setUser(res.data);
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
