"use client";
import useAxios from "@/hooks/useAxios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const axiosInstance = useAxios();
  const [allQuotes, setAllQuotes] = useState([]);
  console.log(allQuotes);
  useEffect(() => {
    const fetchAllQuotes = async () => {
      try {
        const res = await axiosInstance.get("/all-quotes");
        setAllQuotes(res.data.quotes);
      } catch (error) {
        console.log(error);
      }
      fetchAllQuotes();
    };
  }, [axiosInstance]);
  return <div>hello quotes app</div>;
}
