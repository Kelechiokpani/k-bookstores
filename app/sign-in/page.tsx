"use client";

import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Lock, Eye, EyeOff } from "lucide-react";

// Redux & API Imports
import { useAppDispatch } from "@/app/hooks";
import { useLoginMutation } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import { toast } from "sonner";
import {useToast} from "@/components/ui/use-toast";



export default function SignInPage() {
  const { toast } = useToast()
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  // Local State
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Call the API
      const response = await login(form).unwrap();

      // 2. Update Redux State (saves user and token)
      dispatch(setCredentials(response));

      // toast.success("Welcome back!");
      toast({
        title: "Success!",
        description: "You have been logged in.",
      })
      // 3. Redirect
      router.push("/books");
    } catch (err: any) {
      toast({
        title: "Failed!",
        description: `${err?.data?.message || "Invalid email or password"}`
      })
    }
  };

  return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Kbook Stores Logo"
                    width={100}
                    height={100}
                    className="h-20 w-auto"
                />
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold">
              Sign in to your account
            </CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="kbooks@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className='py-4'
                />
              </div>

              {/* Password Field with Toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      className="pr-10"
                      required
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300 cursor-pointer"
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember me
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <Lock className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-xs text-muted-foreground">
                Secure, encrypted connection
              </span>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
  );
}