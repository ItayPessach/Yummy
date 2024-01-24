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

    // TODO: find prettier way to handle this
    request
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          const { request } = authService.refresh();

          request
            .then((res) => {
              document.cookie = `access_token=${res.data.accessToken}; path=/`;
              document.cookie = `refresh_token=${res.data.refreshToken}; path=/`;

              const { request } = usersService.getMe();

              request
                .then((res) => {
                  setUser(res.data);
                  setLoading(false);
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        } else {
          setLoading(false);
        }
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
