import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Layers, Snowflake } from "lucide-react"
import { SiMysql, SiGooglebigquery } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import AmazonS3 from "../../../public/images/amazons3.png"
import AzureSynapse from "../../../public/images/azure_synapse.png"
import AzureData from "../../../public/images/azure_data.png"
import SQLServer from "../../../public/images/sql_server.png"
import SQLServer2 from "../../../public/images/sql_server2.png"
import Image from "next/image";



interface TechnologyItem {
    id: string
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any
    color: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any
}

const technologies: TechnologyItem[] = [
    {
        id: "snowflake",
        name: "Snow flake",
        icon: <Snowflake className="w-8 h-8" />,
        color: "text-blue-500",
    },
    {
        id: "sql-server-1",
        name: "SQL Server",
        icon: "",
        color: "text-blue-600",
        image: SQLServer
    },
    {
        id: "big-query",
        name: "Big Query",
        icon: <SiGooglebigquery className="w-8 h-8" />,
        color: "text-blue-500",
    },
    {
        id: "data-bricks",
        name: "Data Bricks",
        icon: <Layers className="w-8 h-8" />,
        color: "text-red-500",
    },
    {
        id: "postgre-sql",
        name: "Postgre SQL",
        icon: <BiLogoPostgresql className="w-8 h-8" />,
        color: "text-blue-700",
    },
    {
        id: "mysql",
        name: "MySQL",
        icon: <SiMysql className="w-8 h-8" />,
        color: "text-blue-600",
    },
    {
        id: "sql-server-2",
        name: "SQL Server",
        icon: "",
        color: "text-gray-600",
        image: SQLServer2
    },
    {
        id: "azure-data-lake",
        name: "Azure Data Lake Storage",
        icon: "",
        color: "text-blue-500",
        image: AzureData
    },
    {
        id: "azure-synapse",
        name: "Azure synapse",
        icon: "",
        color: "text-blue-500",
        image: AzureSynapse
    },
    {
        id: "amazon-s3",
        name: "Amazon S3",
        icon: "",
        color: "text-orange-500",
        image: AmazonS3
    },
]

export default function TechnologyShowcase() {
    return (
        <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Lorem ipsum dolor sit amet consectetur. Id
                    </h1>

                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    </p>
                </div>

                {/* Technology Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                    {technologies.map((tech) => (
                        <Card
                            key={tech.id}
                            className="border-none shadow-[0px_2px_56px_0px_#0000001F]"
                        >
                            <CardContent className="flex items-center p-6">
                                <div className={`mr-4 ${tech.color}`}>
                                    {
                                        tech.icon ?
                                            tech.icon
                                            :
                                            <Image
                                                src={tech.image}
                                                alt={tech.name}
                                                width={1000}
                                                height={1000}
                                                className="w-8 h-8"
                                            />

                                    }
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{tech.name}</h3>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
