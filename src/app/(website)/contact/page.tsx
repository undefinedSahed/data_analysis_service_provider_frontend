"use client"

import { ContactForm } from "@/components/contact/contact-form"
import Banner from "@/components/shared/banner"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
        <div>
            <Banner/>
        </div>
      <div className="container mx-auto px-4 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="space-y-8">
            <ContactForm />
            <div className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">Lorem ipsum dolor sit amet</h1>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper.
            </p>

            <ul className="space-y-4">
              <li className="text-gray-600">
                <span className="font-semibold text-gray-800">Lorem ipsum:</span> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
                ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              </li>
              <li className="text-gray-600">
                <span className="font-semibold text-gray-800">Lorem ipsum:</span> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
                ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              </li>
              <li className="text-gray-600">
                <span className="font-semibold text-gray-800">Lorem ipsum:</span> Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed eget euismod velit. Ut dapibus est urna. Suspendisse dictum facilisis
                ullamcorper. Maecenas vitae efficitur tortor, in placerat dui.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
