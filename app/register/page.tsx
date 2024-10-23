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

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { registerSchema } from "@/lib/validation-schema/register";
import { Roles } from "@/lib/enums/role";

const RegisterPage = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <CardTitle className="text-center text-3xl font-extrabold text-gray-900">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="Logo"
            className="mx-auto"
          />
          Register
        </CardTitle>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* NameField */}
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="name"
                        placeholder="Name"
                        className="mt-1 block w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-row items-center space-x-2 space-y-0"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={Roles.DOCTOR} />
                          </FormControl>
                          <FormLabel className="font-normal">Doctor</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={Roles.PATIENT} />
                          </FormControl>
                          <FormLabel className="font-normal">Patient</FormLabel>
                        </FormItem>
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={Roles.OTHERS} />
                          </FormControl>
                          <FormLabel className="font-normal">Others</FormLabel>
                        </FormItem>
                      </RadioGroup>
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
                Register
              </Button>

              {/* Register Link */}
              <a
                href="/login"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Login here
              </a>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
