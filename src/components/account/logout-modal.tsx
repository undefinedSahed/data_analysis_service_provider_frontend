"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function LogoutModal() {
    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const handleLogout = () => {
        // Handle logout logic here
        console.log("User logged out")
        setShowLogoutModal(false)
    }

    return (
        <>
            <button
                onClick={() => setShowLogoutModal(true)}
                className="pb-4 px-1 border-b-2 border-transparent text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1"
            >
                <LogOut className="h-4 w-4" />
                Log out
            </button>

            <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to log out? You will need to sign in again to access your account.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setShowLogoutModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleLogout}>
                            Log out
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
