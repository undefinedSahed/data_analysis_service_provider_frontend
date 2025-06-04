"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import Image from "next/image"

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Solution", href: "/solution" },
    { name: "Contact", href: "/contact" },
    { name: "Blogs", href: "/blogs" },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="fixed top-0 z-50 w-full">
            <nav className="w-full bg-[#131313]">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between lg:h-20 h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-2">
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo"
                                    width={600}
                                    height={300}
                                    className="w-36"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation - Now only shows on large screens (lg and up) */}
                        <div className="hidden lg:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                {navigationItems.map((item) => {
                                    const isActive = item.href === pathname
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`${isActive ? "text-cyan-400" : "text-white"} px-3 py-2 text-lg font-medium transition-colors duration-200`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Right side - Desktop - Now only shows on large screens */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center cursor-pointer">
                                        <Button variant="default" size="icon" className="text-white bg-primary rounded-full">
                                            <div className="">
                                                <User className="h-7 w-7" />
                                                <span className="sr-only">User menu</span>
                                            </div>
                                        </Button>
                                        <ChevronDown className="text-primary h-4 w-4 shrink-0 opacity-50" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link href="/login">Log In</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Link href="/signup">Sign Up</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Link href="/account">Account</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link href="/strategy-solution">
                                <Button className="bg-[#38B1EA] hover:bg-cyan-600 text-white px-6 py-2 rounded-md font-medium">
                                    Strategy session
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile/Tablet menu button - Now shows on tablets too */}
                        <div className="lg:hidden">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-white hover:text-cyan-400 hover:bg-white/10">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Open main menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                    <div className="flex flex-col space-y-4 mt-8">
                                        {navigationItems.map((item) => {
                                            const isActive = item.href === pathname
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={`${isActive ? "text-cyan-400" : "text-foreground"} text-lg font-medium hover:text-cyan-600 transition-colors duration-200`}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                        })}
                                        <div className="pt-4 border-t">
                                            <Link href="/strategy-solution">
                                                <Button className="w-full bg-[#38B1EA] hover:bg-cyan-600 text-white mb-4">
                                                    Strategy session
                                                </Button>
                                            </Link>
                                            <div className="space-y-2">
                                                <Button variant="ghost" className="w-full justify-start">
                                                    <Link href="/login" className="w-full text-left">
                                                        Log In
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" className="w-full justify-start">
                                                    <Link href="/signup" className="w-full text-left">
                                                        Sign Up
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
