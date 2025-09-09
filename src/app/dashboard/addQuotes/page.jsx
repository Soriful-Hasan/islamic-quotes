"use client";

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAxios from "@/hooks/useAxios";

export default function AddQuotePage() {
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  // submit handler
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const res = await axiosInstance.post("/add", data);
      console.log(res.data);
      alert("Quote added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add quote");
    }
    // reset();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md border dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            ➕ Add New Quote
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Quote Text */}
            <div className="space-y-2">
              <Label htmlFor="quote">Quote</Label>
              <Textarea
                id="quote"
                placeholder="Write your quote here..."
                className="resize-none"
                {...register("quote", {
                  required: "Quote is required",
                  minLength: {
                    value: 10,
                    message: "Quote must be at least 10 characters",
                  },
                })}
              />
              {errors.quote && (
                <p className="text-red-500 text-sm">{errors.quote.message}</p>
              )}
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">Author / Reference</Label>
              <Input
                id="author"
                placeholder="e.g. Hadith, Quran, Scholar"
                {...register("author", {
                  required: "Author/Reference is required",
                })}
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="islamic">Islamic</SelectItem>
                  <SelectItem value="life">Life</SelectItem>
                  <SelectItem value="motivation">Motivation</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Hidden input for category */}
            <input
              type="hidden"
              {...register("category", { required: "Category is required" })}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Save Quote
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
