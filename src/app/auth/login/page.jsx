"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
export default function Login() {
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
      const res = await axiosInstance.post("/login", data, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setServerMsg("Logged in successfully ✅");

        reset();
        // if you want: router.push("/dashboard")
      } else {
        setServerMsg("Login failed");
      }
    } catch (err) {
      setServerMsg("Invalid email or password");
    }
  };
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg border p-6 shadow"
      >
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
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="">
          <span>
            Don't have a account{" "}
            <span className="text-blue-500 hover:underline hover:cursor-pointer">
              <Link href={"/auth/register"}>Register</Link>
            </span>
          </span>
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Logging in..." : "Login"}
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
