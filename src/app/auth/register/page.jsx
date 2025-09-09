"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";

export default function Register() {
  const axiosInstance = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [serverMsg, setServerMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/register", data);
      if (res.status === 201) {
        setServerMsg("User registered successfully ✅");
        reset();
        // router.push("/login") if you want redirect
      } else {
        const result = await res.json();
        setServerMsg(result.message || "Registration failed");
      }
    } catch (err) {
      setServerMsg("Something went wrong");
    }
  };
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Register</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg border p-6 shadow"
      >
        {/* Name */}
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Photo URL */}
        <div className="space-y-1">
          <Label htmlFor="photo">Photo URL</Label>
          <Input id="photo" placeholder="https://..." {...register("photo")} />
        </div>
        <div className="">
          <span>
            Already have a account{" "}
            <span className="text-blue-500 hover:underline hover:cursor-pointer">
              <Link href={"/auth/login"}>Login</Link>
            </span>
          </span>
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Registering..." : "Register"}
        </Button>
      </form>

      {serverMsg && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {serverMsg}
        </p>
      )}
    </div>
  );
}
