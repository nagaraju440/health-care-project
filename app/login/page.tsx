"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import logo from "../assets/bayer-logo.png";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/lib/validation-schema/login";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { login } from "./action";

const LoginPage = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    await login(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {/* Logo */}

        {/* Title */}
        <CardTitle className="text-center text-3xl font-extrabold text-gray-900">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="Logo"
            className="mx-auto"
          />
          Login
        </CardTitle>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Email Field */}
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        placeholder="email@gmail.com"
                        className="mt-1 block w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="mt-1 block w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Submit Button */}
            <CardFooter className="flex flex-col items-center space-y-4">
              <Button
                type="submit"
                className="w-full py-2 px-4 bg-lime-500 text-white hover:bg-lime-600"
              >
                Login
              </Button>

              {/* Register Link */}
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                New User? Register here
              </a>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
