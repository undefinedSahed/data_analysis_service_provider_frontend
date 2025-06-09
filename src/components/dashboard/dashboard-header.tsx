"use client"
import Link from "next/link"
import { ChevronDown, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession, signOut } from "next-auth/react"

export function DashboardHeader() {
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const getUserInitials = () => {
    if (!session?.user?.name) return "U"
    const names = session.user.name.split(" ")
    const firstInitial = names[0] ? names[0][0] : ""
    const lastInitial = names[1] ? names[1][0] : ""
    return `${firstInitial}${lastInitial}`
  }

  console.log(session)

  return (
    <header className="flex w-full items-center justify-between border-b border-[#222] bg-[#131313] p-4 backdrop-blur-xl">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-4">
        {status === "authenticated" && session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center space-x-2">
                <Avatar className="border border-red-600">
                  <AvatarImage src={session.user?.image || ""} width={100} height={100} />
                  <AvatarFallback className="bg-red-900 text-white">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <span className="hidden text-sm text-white md:block">
                  {session.user?.name}
                  {session.user?.role && <span className="ml-1 text-xs text-red-300">({session.user.role})</span>}
                </span>
                <ChevronDown className="h-4 w-4 text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 text-left">
                  <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                  {session.user?.role && (
                    <p className="text-xs leading-none text-muted-foreground capitalize">Role: {session.user.role}</p>
                  )}
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Fallback for unauthenticated users
          <div className="flex cursor-pointer items-center space-x-2">
            <Avatar className="border border-red-600">
              <AvatarFallback className="bg-red-900 text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm text-white md:block">Guest</span>
          </div>
        )}
      </div>
    </header>
  )
}
