import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { IUser } from "@/common/types";

interface UserContextType {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
