"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile, updateUserProfile } from "@/lib/api";
import { Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { z } from "zod";

// Validation schema - most fields are optional, no phone format validation
const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  country: z.string().optional(),
  cityOrState: z.string().optional(),
  roadOrArea: z.string().optional(),
  postalCode: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[A-Za-z0-9\s-]{3,10}$/.test(val),
      "Invalid postal code format"
    ),
});

const imageSchema = z.object({
  size: z.number().max(5 * 1024 * 1024, "Image must be less than 5MB"),
  type: z.enum(["image/jpeg", "image/png", "image/gif"], {
    errorMap: () => ({
      message: "Only JPG, PNG, and GIF formats are supported",
    }),
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>("");

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,
    select: (data) => data.data,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      cityOrState: "",
      roadOrArea: "",
      postalCode: "",
    },
  });

  // Reset form with user data when userData is loaded
  useEffect(() => {
    if (userData) {
      form.reset({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country: userData.country || "",
        cityOrState: userData.cityOrState || "",
        roadOrArea: userData.roadOrArea || "",
        postalCode: userData.postalCode || "",
      });
    }
  }, [userData, form]);

  const updateMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ data, image }: { data: any; image?: File }) =>
      updateUserProfile(data, image),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setSelectedImage(null);
      setImagePreview(null);
      setImageError("");
      window.location.reload();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const validateImage = (file: File): string | null => {
    try {
      imageSchema.parse({
        size: file.size,
        type: file.type,
      });
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return "Invalid image file";
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageValidationError = validateImage(file);
      if (imageValidationError) {
        setImageError(imageValidationError);
        setSelectedImage(null);
        setImagePreview(null);
        return;
      }

      setImageError("");
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    if (selectedImage && imageError) {
      toast.error("Please fix the image error before submitting");
      return;
    }

    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || "",
      country: data.country || "",
      cityOrState: data.cityOrState || "",
      roadOrArea: data.roadOrArea || "",
      postalCode: data.postalCode || "",
    };

    updateMutation.mutate({
      data: updateData,
      image: selectedImage || undefined,
    });
  };

  const handleReset = () => {
    if (userData) {
      form.reset({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country: userData.country || "",
        cityOrState: userData.cityOrState || "",
        roadOrArea: userData.roadOrArea || "",
        postalCode: userData.postalCode || "",
      });
      setSelectedImage(null);
      setImagePreview(null);
      setImageError("");
      toast.info("Form reset to original values");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Personal Information
        </h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={updateMutation.isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="profile-form"
            className="bg-sky-500 hover:bg-sky-600"
            disabled={updateMutation.isPending || form.formState.isSubmitting}
          >
            {updateMutation.isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="profile-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Image Upload Section */}
          <div className="mb-6">
            <FormLabel>Profile Picture</FormLabel>
            <div className="mt-2 flex items-center gap-4">
              <div className="relative">
                <Image
                  src={
                    imagePreview || userData?.imageLink || "/images/user.jpeg"
                  }
                  alt="Profile preview"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload New Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG or GIF (max 5MB)
                </p>
                {imageError && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {imageError}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled
                      className="text-red-700"
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    Contact support to change email
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cityOrState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="roadOrArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Road/Area</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="max-w-md">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="12345 or AB1 2CD" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="text-sm text-gray-600">
            <p>* Only name fields are required</p>
          </div>
        </form>
      </Form>
    </div>
  );
}
