"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";

export default function PendingQuotesPage() {
  const axiosInstance = useAxios();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(quotes);
  // fetch pending quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axiosInstance.get("/pending-quotes");
        setQuotes(res.data.quotes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  // delete quote
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;
    try {
      await axiosInstance.delete(`/quotes/approve/${id}`);
      setQuotes(quotes.filter((q) => q._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // approve quote
  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/quotes/approve/${id}`);
      setQuotes(quotes.filter((q) => q._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {quotes.map((quote) => (
        <Card key={quote._id} className="shadow-md border dark:border-gray-800">
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
                variant="outline"
                onClick={() => handleApprove(quote._id)}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(quote._id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
