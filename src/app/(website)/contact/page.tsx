"use client"

import { ContactForm } from "@/components/contact/contact-form"
import Banner from "@/components/shared/banner"
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <Banner />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Contact Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Get in touch</h1>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address:</h3>
                    <p className="text-gray-600">3517 W. Gray St, Utica, Pennsylvania 57867</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone:</h3>
                    <p className="text-gray-600">(671) 555-0110</p>
                    <p className="text-gray-600">(229) 555-0109</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email:</h3>
                    <p className="text-gray-600">felicia.reid@example.com</p>
                    <p className="text-gray-600">dolores.chambers@example.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Social Media</h2>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">We're Here to Help!</h2>
              <p className="text-gray-600">
                If you have inquiries, partnerships, or additional information about how we can help your local
                business, please contact our support channel.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
