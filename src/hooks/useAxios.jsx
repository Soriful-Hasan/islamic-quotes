import axios from "axios";
import React from "react";

export default function useAxios() {
  const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });
  return instance;
}
