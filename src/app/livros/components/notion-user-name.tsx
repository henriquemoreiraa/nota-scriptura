"use client";

import { useUserContext } from "@/context/user-context";

export const NotionUserName = () => {
  const { user } = useUserContext();

  return !user ? <span className="animate-pulse">...</span> : `, ${user.name}`;
};
