import type React from "react"
import { ActiveLink } from "@/components/account/active-link"
import { LogoutModal } from "@/components/account/logout-modal"

const navigation = [
    { name: "My Profile", href: "/account" },
    { name: "Change password", href: "/account/change-password" },
    { name: "Service", href: "/account/service" },
    { name: "Payment", href: "/account/payment" },
    { name: "Staffing Need", href: "/account/staffing-need" },
    { name: "Strategy Solutions", href: "/account/strategy-solutions" },
    { name: "My Data Sets", href: "/account/data-sets" },
]

export default function AccountsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen py-16 lg:py-8 bg-white">
            <div className="container mx-auto">
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-gray-900">Accounts</h1>
                </div>

                <nav className="border-b border-gray-200 mb-8">
                    <div className="flex flex-wrap justify-center gap-8">
                        {navigation.map((item) => (
                            <ActiveLink key={item.name} href={item.href}>
                                {item.name}
                            </ActiveLink>
                        ))}
                        <LogoutModal />
                    </div>
                </nav>

                {children}
            </div>
        </div>
    )
}
