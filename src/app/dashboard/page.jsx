"use client";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !loading) {
      return redirect("/auth/login");
    }
  }, [user, redirect]);

  if (loading) {
    return <p>Loading......</p>;
  }

  return (
    <div>
      Dashboard
      <p>Hello {user?.name}</p>
    </div>
  );
}
