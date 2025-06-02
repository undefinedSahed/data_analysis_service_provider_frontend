import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Footer() {
    return (
        <footer className="w-full text-[#E7E7E7] lg:py-20 py-8 bg-black">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="">
                        <div className="flex items-center space-x-2">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2">
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo"
                                    width={1000}
                                    height={700}
                                    className="w-36 h-28 -mt-6 object-cover"
                                />
                            </Link>
                        </div>
                        <p className="text-[#E7E7E7] text-sm leading-relaxed">
                            Empowering businesses with innovative solutions and strategic insights to drive growth and success in the
                            digital age.
                        </p>
                        <div className="flex space-x-4 pt-4">
                            <Button variant="ghost" size="icon" className="text-primary bg-white rounded-full">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-primary bg-white rounded-full">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-primary bg-white rounded-full">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-primary bg-white rounded-full">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl pb-3 font-semibold">Company</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-[#E7E7E7] hover:text-[#E7E7E7] transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/solution#services" className="text-[#E7E7E7] hover:text-[#E7E7E7] transition-colors duration-200">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-[#E7E7E7] hover:text-[#E7E7E7] transition-colors duration-200">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-[#E7E7E7] hover:text-[#E7E7E7] transition-colors duration-200">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-xl pb-3 font-semibold">Support</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/strategy" className="text-[#E7E7E7] hover:text-[#E7E7E7] transition-colors duration-200">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/digital" className="text-[#E7E7E7] hover:text-[#E7E7E7] transition-colors duration-200">
                                    Terms Of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/#faq" className="text-[#E7E7E7] hover:text-[#E7E7E7] transition-colors duration-200">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-[#E7E7E7] hover:text-[#E7E7E7] transition-colors duration-200">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold pb-1 lg:pb-8">Subscribe To Our NEWSLETTER</h3>
                        <div className="space-y-3">
                            <p>Connect with us on social media and stay in the loop:</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex space-x-2">
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-[#000000] text-[#E7E7E7] placeholder:text-blue-200"
                                />
                                <Button className="bg-cyan-500 hover:bg-cyan-600 text-[#E7E7E7]">Subscribe</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-[#E7E7E7]">
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
                        <p className="text-[#E7E7E7] text-base">© 2025 Quantivo. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
