"use client";

import { Status } from "@/types/api";
import { UserObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode, createContext, useContext, useMemo } from "react";

type UserContextType = {
  user?: UserObjectResponse;
  status: Status;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  status: "idle",
});

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const { data: user, status } = useQuery({
    queryKey: ["user"],
    queryFn: () => axios.get("/api/notion/user"),
  });

  const value: UserContextType = useMemo(
    () => ({
      user: user?.data,
      status,
    }),
    [user, status]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
