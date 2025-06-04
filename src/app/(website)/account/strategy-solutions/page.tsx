import { StrategyTable } from "@/components/account/strategy-table"

// This would typically come from your API
const strategySolutions = [
    {
        id: 1,
        user: "John Smith",
        email: "john.smith@example.com",
        focusArea: "Power BI (UI/UX design enhancement)",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 2,
        user: "John Smith",
        email: "john.smith@example.com",
        focusArea: "Power BI (UI/UX design enhancement)",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 3,
        user: "John Smith",
        email: "john.smith@example.com",
        focusArea: "Power BI (UI/UX design enhancement)",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 4,
        user: "John Smith",
        email: "john.smith@example.com",
        focusArea: "Power BI (UI/UX design enhancement)",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 5,
        user: "John Smith",
        email: "john.smith@example.com",
        focusArea: "Power BI (UI/UX design enhancement)",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        date: "2023-01-15",
        time: "10:00PM",
    },
    {
        id: 6,
        user: "John Smith",
        email: "john.smith@example.com",
        focusArea: "Power BI (UI/UX design enhancement)",
        notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dapibus tempus.....",
        date: "2023-01-15",
        time: "10:00PM",
    },
]

export default function StrategySolutionsPage() {
    // These would come from your API response
    const totalPages = 17
    const perPage = 10
    const totalItems = 50

    return (
        <div className="container mx-auto">
            <StrategyTable
                strategySolutions={strategySolutions}
                totalPages={totalPages}
                perPage={perPage}
                totalItems={totalItems}
            />
        </div>
    )
}
