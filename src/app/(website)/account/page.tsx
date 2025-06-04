import { UserProfileHeader } from "@/components/account/user-profile-data"
import { ProfileForm } from "@/components/account/profile-form"

export default function MyProfilePage() {
    return (
        <div className="container mx-auto space-y-8">
            {/* Profile Header */}
            <UserProfileHeader />

            {/* Personal Information Form */}
            <ProfileForm />
        </div>
    )
}
