"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxios from "@/hooks/useAxios";

export default function PendingQuotesPage() {
  const axiosInstance = useAxios();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // dialog state
  const [open, setOpen] = useState(false);
  const [editQuote, setEditQuote] = useState(null);
  const [quoteText, setQuoteText] = useState("");
  const [authorText, setAuthorText] = useState("");
  const [categoryText, setCategoryText] = useState("");

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
      await axiosInstance.delete(`/quotes/delete/${id}`);
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

  // open edit dialog
  const handleOpenEdit = (quote) => {
    setEditQuote(quote);
    setQuoteText(quote.quote);
    setAuthorText(quote.author);
    setCategoryText(quote.category);
    setOpen(true);
  };

  // submit edit
  const handleEditSubmit = async () => {
    try {
      await axiosInstance.put(`/quotes/edit/${editQuote._id}`, {
        quote: quoteText,
        author: authorText,
        category: categoryText,
      });
      setQuotes(
        quotes.map((q) =>
          q._id === editQuote._id
            ? {
                ...q,
                quote: quoteText,
                author: authorText,
                category: categoryText,
              }
            : q
        )
      );
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {quotes.map((quote) => (
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
                  variant="outline"
                  onClick={() => handleApprove(quote._id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleOpenEdit(quote)}
                >
                  Edit
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

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Quote</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Quote</Label>
              <Textarea
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input
                value={authorText}
                onChange={(e) => setAuthorText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={categoryText}
                onChange={(e) => setCategoryText(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
