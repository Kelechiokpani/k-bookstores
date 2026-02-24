"use client";
import type React from "react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCredentials } from "@/features/auth/authSlice";
import { useRegisterMutation } from "@/features/auth/authApi";
import { useAppDispatch } from "@/app/hooks";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"




export default function SignUpPage() {
  const { toast } = useToast()
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Pattern: at least 8 chars, 1 number, 1 special char
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passRegex.test(form.password)) {
      newErrors.password = "Password must be 8+ chars with a number and special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      // Data sent matches the User Schema (name, email, password)
      const response = await registerUser(form).unwrap();
      dispatch(setCredentials(response));
      toast({
        title: "Success!",
        description: "Account created successfully!.",
      })
      router.push("/books");
    } catch (err: any) {
      toast({
        title: "Failed!",
        description: `${err?.data?.message || "Registration failed. Try again."}`
      })
    }
  };

  return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={100} height={100} className="h-20 w-auto" />
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" value={form.name} onChange={handleChange} required/>
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="kbooks@gmail.com" value={form.email} onChange={handleChange} required/>
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
                      value={form.password}
                      onChange={handleChange}
                      required
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded border-gray-300" required/>
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the <Link href="/terms" className="text-primary hover:underline">Terms</Link>
                </Label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Already have an account? <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link>
              </div>
              <div className="mt-6 flex items-center justify-center">
                <Lock className="h-4 w-4 text-muted-foreground mr-1"/>
                <span className="text-xs text-muted-foreground">Securely encrypted</span>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
  );
}