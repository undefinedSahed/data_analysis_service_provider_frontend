"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, User, ChevronDown, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Solution", href: "/solution" },
    { name: "Contact", href: "/contact" },
    { name: "Blogs", href: "/blogs" },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const { data: session, status } = useSession()

    return (
        <header className="sticky top-0 z-50 w-full">
            <nav className="w-full bg-[#131313]">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between lg:h-20 h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center space-x-2">
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo"
                                    width={144}
                                    height={60}
                                    className="w-36"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                {navigationItems.map((item) => {
                                    const isActive = item.href === pathname
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`${isActive ? "text-cyan-400" : "text-white"} px-3 py-2 text-lg font-medium transition-colors duration-200 hover:text-cyan-400`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Right side - Desktop */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {status === "authenticated" && session ? (
                                // Profile Dropdown for authenticated users
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-cyan-400 hover:bg-white/10">
                                            <div className="flex items-center space-x-2">
                                                {session.user?.image ? (
                                                    <Image
                                                        src={session.user.image || "/placeholder.svg"}
                                                        alt={session.user.name || "User"}
                                                        width={80}
                                                        height={80}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                                                        <User className="h-4 w-4 text-white" />
                                                    </div>
                                                )}
                                                <span className="hidden sm:block">{session.user?.name}</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="flex flex-col space-y-1 p-2">
                                            <p className="text-sm font-medium">{session.user?.name}</p>
                                            <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                                            {session.user?.role && (
                                                <p className="text-xs text-muted-foreground capitalize">Role: {session.user.role}</p>
                                            )}
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            {
                                                session.user?.role === "admin" ? (
                                                    <Link href="/dashboard" className="cursor-pointer">
                                                        Dashboard
                                                    </Link>
                                                ) : (
                                                    <Link href="/account" className="cursor-pointer">
                                                        Account Setting
                                                    </Link>
                                                )
                                            }
                                        </DropdownMenuItem>
                                        {/* <DropdownMenuItem asChild>
                                            <Link href="/profile" className="cursor-pointer">
                                                Profile
                                            </Link>
                                        </DropdownMenuItem> */}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="cursor-pointer text-red-600 focus:text-red-600"
                                            onClick={() => signOut()}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                // Login button for non-authenticated users
                                <Link href="/login">
                                    <Button variant="outline" className="border-white hover:bg-white hover:text-black">
                                        Log In
                                    </Button>
                                </Link>
                            )}

                            <Link href="/strategy-solution">
                                <Button className="bg-[#38B1EA] hover:bg-cyan-600 text-white px-6 py-2 rounded-md font-medium">
                                    Strategy session
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
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
                                        {/* User info section for mobile */}
                                        {status === "authenticated" && session && (
                                            <div className="p-4 border rounded-lg bg-gray-50">
                                                <div className="flex items-center space-x-3">
                                                    {session.user?.image ? (
                                                        <Image
                                                            src={session.user.image || "/placeholder.svg"}
                                                            alt={session.user.name || "User"}
                                                            width={40}
                                                            height={40}
                                                            className="rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                                                            <User className="h-5 w-5 text-white" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-sm">{session.user?.name}</p>
                                                        <p className="text-xs text-gray-600 truncate">{session.user?.email}</p>
                                                        {session.user?.role && (
                                                            <p className="text-xs text-gray-500 capitalize">Role: {session.user.role}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Navigation items */}
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

                                        <div className="pt-4 border-t space-y-2">
                                            <Link href="/strategy-solution">
                                                <Button className="w-full bg-[#38B1EA] hover:bg-cyan-600 text-white mb-4">
                                                    Strategy session
                                                </Button>
                                            </Link>

                                            {status === "authenticated" && session ? (
                                                <>
                                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                                        <Link href="/account">Account Settings</Link>
                                                    </Button>
                                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                                        <Link href="/profile">Profile</Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => {
                                                            signOut()
                                                            setIsOpen(false)
                                                        }}
                                                    >
                                                        <LogOut className="mr-2 h-4 w-4" />
                                                        Log Out
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                                        <Link href="/login">Log In</Link>
                                                    </Button>
                                                    <Button variant="ghost" className="w-full justify-start" asChild>
                                                        <Link href="/signup">Sign Up</Link>
                                                    </Button>
                                                </>
                                            )}
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
