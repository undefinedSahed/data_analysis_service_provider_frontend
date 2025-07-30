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
import { resetPassword } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordForm() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await resetPassword({
      token: token as string,
      password: values.confirmPassword as string,
    });

    if (result.success) {
      toast.success(result.message || "Password reset successfully!");
      router.push(`/login`);
    } else {
      toast.error(result.message || "Failed to reset password");
    }
  }

  return (
    <section>
      <div className="flex justify-center items-center min-h-screen p-4">
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
                  Reset Password
                </h2>
                <p className="text-gray-600 mb-8">Create your new password</p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter new password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter confirm new password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-[#00A3E1] hover:bg-[#0089c1] text-white py-2"
                    >
                      Continue
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
