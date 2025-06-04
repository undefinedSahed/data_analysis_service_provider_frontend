import { PaymentTable } from "@/components/account/payment-table"

// This would typically come from your API
const payments = [
    {
        id: 1,
        service: "ABC Service",
        total: "$500",
        paymentMethod: "Pay Pal",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 2,
        service: "ABC Service",
        total: "$500",
        paymentMethod: "Pay Pal",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 3,
        service: "ABC Service",
        total: "$500",
        paymentMethod: "Pay Pal",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 4,
        service: "ABC Service",
        total: "$500",
        paymentMethod: "Pay Pal",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 5,
        service: "ABC Service",
        total: "$500",
        paymentMethod: "Pay Pal",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 6,
        service: "ABC Service",
        total: "$500",
        paymentMethod: "Pay Pal",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 7,
        service: "ABC Service",
        total: "$500",
        paymentMethod: "Pay Pal",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 8,
        service: "ABC Service",
        total: "$500",
        paymentMethod: "Pay Pal",
        date: "2023-01-15",
        time: "10:00PM",
    },
]

export default function PaymentPage() {
    // These would come from your API response
    const totalPages = 17
    const perPage = 10
    const totalItems = 50

    return (
        <div className="container mx-auto">
            <PaymentTable payments={payments} totalPages={totalPages} perPage={perPage} totalItems={totalItems} />
        </div>
    )
}
