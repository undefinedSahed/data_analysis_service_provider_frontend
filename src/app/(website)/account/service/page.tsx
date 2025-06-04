import { ServiceTable } from "@/components/account/service-table"

// This would typically come from your API
const services = [
    {
        id: 1,
        name: "Business Data Solutions",
        description:
            "Lorem ipsum dolor sit amet consectetur. Id vestibulum sit et magna purus. Gravida libero in semper eu egestas. Amet odio eu eget justo. Aliquam id rhoncus.",
        date: "2023-01-15",
        time: "10:00PM",
        status: "Pending" as const,
    },
    {
        id: 2,
        name: "Business Data Solutions",
        description:
            "Lorem ipsum dolor sit amet consectetur. Id vestibulum sit et magna purus. Gravida libero in semper eu egestas. Amet odio eu eget justo. Aliquam id rhoncus.",
        date: "2023-01-15",
        time: "10:00PM",
        status: "Accepted" as const,
    },
    {
        id: 3,
        name: "Business Data Solutions",
        description:
            "Lorem ipsum dolor sit amet consectetur. Id vestibulum sit et magna purus. Gravida libero in semper eu egestas. Amet odio eu eget justo. Aliquam id rhoncus.",
        date: "2023-01-15",
        time: "10:00PM",
        status: "Accepted" as const,
    },
    {
        id: 4,
        name: "Business Data Solutions",
        description:
            "Lorem ipsum dolor sit amet consectetur. Id vestibulum sit et magna purus. Gravida libero in semper eu egestas. Amet odio eu eget justo. Aliquam id rhoncus.",
        date: "2023-01-15",
        time: "10:00PM",
        status: "Accepted" as const,
    },
]

export default function ServicePage() {
    // These would come from your API response
    const totalPages = 17
    const perPage = 10
    const totalItems = 50

    return (
        <div className="container mx-auto">
            <ServiceTable services={services} totalPages={totalPages} perPage={perPage} totalItems={totalItems} />
        </div>
    )
}
