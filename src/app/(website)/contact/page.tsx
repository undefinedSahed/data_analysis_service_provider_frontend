"use client"

import { ContactForm } from "@/components/contact/contact-form"
import Banner from "@/components/shared/banner"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <Banner />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">We&apos;re Here to Help!</h2>
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
