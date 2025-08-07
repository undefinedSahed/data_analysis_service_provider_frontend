"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        toast.error(result.error);
      }

      if (result?.ok) {
        const session = await getSession();

        toast.success("Login successful");
        router.push(session?.user?.role === "admin" ? "/dashboard" : "/account/data-sets");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-6xl lg:shadow-[0px_0px_60px_0px_#00000040] rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Left side - Blue div (hidden on small screens) */}
            <div className="relative hidden lg:block min-h-[600px] ">
              <div className="absolute bg-[#C1E7F8] w-full h-full">
                <div className="flex justify-center items-center h-full">
                  <Image
                    src="/images/logo-b.png"
                    alt="Authentication Image"
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-4 md:p-12">
              <div className="max-w-lg mx-auto">
                <h2 className="font-semibold text-3xl md:text-4xl pb-2">
                  Welcome 👋{" "}
                </h2>
                <p className="text-gray-600 mb-8">Please enter details</p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your email address"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="text-end">
                      <Link
                        href="/forgot-password"
                        className="text-[#035F8A] hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <Button
                      disabled={isLoading}
                      type="submit"
                      className="w-full bg-[#00A3E1] hover:bg-[#0089c1] text-white py-2"
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </Button>

                    <div className="text-center mt-6">
                      <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                          href="/signup"
                          className="text-[#035F8A] hover:underline"
                        >
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
