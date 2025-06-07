"use client"

import { fetchUserProfile } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

export function UserProfileHeader() {
    const {
        data: userData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile,
        select: (data) => data.data,
    })

    if (isLoading) {
        return (
            <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-6">
                <div className="w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                    <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-80 animate-pulse"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return <div className="bg-red-50 rounded-lg p-6 text-red-600">Failed to load profile data</div>
    }

    return (
        <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-6">
            <div className="relative">
                <Image
                    src={userData?.imageLink || "/images/user.jpeg"}
                    alt={`${userData?.firstName || ""} ${userData?.lastName || ""}`}
                    width={120}
                    height={120}
                    className="w-28 h-28 rounded-full object-cover"
                />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {userData?.firstName} {userData?.lastName}
                </h2>
                <p className="text-gray-600">{userData?.email}</p>
                <p className="text-gray-600">
                    {userData?.postalCode && userData?.roadOrArea && userData?.cityOrState && userData?.country
                        ? `${userData.postalCode}, ${userData.roadOrArea}, ${userData.cityOrState}, ${userData.country}`
                        : "Address not provided"}
                </p>
            </div>
        </div>
    )
}
