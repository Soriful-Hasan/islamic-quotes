import React from "react";
import useAxios from "./useAxios";
import { useRouter } from "next/router";

export default function useLogout({ setUser }) {
  const axiosInstance = useAxios();
//   const router = useRouter();

  const logout = async () => {
    try {
      await axiosInstance.post("/logout", {});
      setUser(null);
      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
}
