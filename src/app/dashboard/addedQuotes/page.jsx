"use client";
import { AuthContext } from "@/app/context/AuthContext";
import useAxios from "@/hooks/useAxios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";

export default function page() {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [myQuotes, setMyQuotes] = useState([]);
  console.log(myQuotes);
  useEffect(() => {
    const fetchUserQuotes = async () => {
      try {
        const res = await axiosInstance.get(
          `/user-quotes?email=${user?.email}`
        );
        setMyQuotes(res.data.quotes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserQuotes();
  }, [email]);

  // delete quote
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;
    try {
      await axiosInstance.delete(`/quotes/delete/${id}`);
      setMyQuotes(myQuotes.filter((q) => q._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {myQuotes.map((quote) => (
          <Card
            key={quote._id}
            className="shadow-md border dark:border-gray-800"
          >
            <CardHeader>
              <CardTitle>{quote.author}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                {quote.quote}
              </p>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Category: {quote.category}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={quote.approved === false} 
                  onClick={() => handleDelete(quote._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
