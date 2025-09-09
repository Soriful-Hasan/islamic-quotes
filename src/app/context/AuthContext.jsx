"use client";
import useAxios from "@/hooks/useAxios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/me");
        console.log(res);
        setUser({
          id: res.data.user.id,
          email: res.data.user.email,
          name: res.data.user.name,
          role: res.data.user.role,
          photo: res.data.user.photo,
        });
      } catch (error) {
        setUser(null);
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
