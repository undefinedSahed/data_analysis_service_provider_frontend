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
import Image from "next/image";
import { forgotPassword } from "@/app/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await forgotPassword(values.email);

    if (res.success) {
      toast.success("OTP Sent to your email");
      router.push(
        `/verify-otp?email=${values.email}&token=${res?.data?.accessToken}&action=reset-password`
      );
      console.log(res);
    } else {
      toast.error(res.message || "Failed to send reset email");
    }

    setIsLoading(false);
  }

  return (
    <section>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-6xl shadow-[0px_0px_60px_0px_#00000040] rounded-lg overflow-hidden">
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
            <div className="p-8 md:p-12">
              <div className="max-w-lg mx-auto">
                <h2 className="font-semibold text-3xl md:text-4xl pb-2">
                  Forgot Password
                </h2>
                <p className="text-gray-600 mb-8">
                  Enter your registered email address. we&apos;ll send you a
                  code to reset your password.
                </p>

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

                    <Button
                      disabled={isLoading}
                      type="submit"
                      className="w-full bg-[#00A3E1] hover:bg-[#0089c1] text-white py-2"
                    >
                      {isLoading ? "Sending OTP..." : "Send OTP"}
                    </Button>
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
