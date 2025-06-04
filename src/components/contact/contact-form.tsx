"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  focusArea: z.string({
    required_error: "Please select a focus area.",
  }),
  notes: z.string().min(10, {
    message: "Notes must be at least 10 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      focusArea: "",
      notes: "",
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          subject: `Contact Form: ${data.focusArea} - ${data.company}`,
          message: `Name: ${data.name}\nCompany: ${data.company}\nFocus Area: ${data.focusArea}\n\nMessage:\n${data.notes}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("Your message has been sent successfully.",
      )
      form.reset()
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.",
       )
    },
  })

  function onSubmit(values: FormData) {
    mutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  {...field}
                  className="h-12 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                />
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
              <FormLabel className="text-gray-900 font-medium">Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  {...field}
                  className="h-12 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your Company Name"
                  {...field}
                  className="h-12 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="focusArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Data Strategy Focus Area</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="analytics">Data Analytics</SelectItem>
                  <SelectItem value="governance">Data Governance</SelectItem>
                  <SelectItem value="architecture">Data Architecture</SelectItem>
                  <SelectItem value="migration">Data Migration</SelectItem>
                  <SelectItem value="visualization">Data Visualization</SelectItem>
                  <SelectItem value="ml">Machine Learning</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Data Strategy Notes & Requests</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write......."
                  className="min-h-[120px] border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="bg-sky-400 hover:bg-sky-500 text-white font-medium py-3 px-8 rounded-md h-12 text-base"
        >
          {mutation.isPending ? "Sending..." : "Let's Talk Data"}
        </Button>
      </form>
    </Form>
  )
}
