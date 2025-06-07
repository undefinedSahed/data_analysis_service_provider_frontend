import { Clock, Shield } from "lucide-react"

export default function DecisionQualitySection() {
    return (
        <section className="bg-[#EBF7FD] py-8 lg:py-20">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center px-4 sm:px-8 lg:px-10" style={{ padding: "20px 16px" }}>
                    <h1
                        className="font-bold pb-4 leading-tight"
                        style={{
                            fontSize: "clamp(28px, 5vw, 40px)",
                            lineHeight: "1.2",
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur. Id
                    </h1>

                    <p
                        className="max-w-4xl mx-auto leading-relaxed"
                        style={{
                            fontSize: "clamp(14px, 2.5vw, 16px)",
                            color: "#3F3F3F",
                            lineHeight: "1.6",
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    </p>
                </div>

                {/* Two Column Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-0">
                    {/* First Column */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                            </div>
                        </div>

                        <h2
                            className="font-semibold text-gray-900 leading-tight"
                            style={{
                                fontSize: "clamp(16px, 3vw, 18px)",
                                lineHeight: "1.3",
                            }}
                        >
                            First Make Your Decision
                        </h2>

                        <p
                            className="leading-relaxed"
                            style={{
                                fontSize: "clamp(14px, 2.5vw, 16px)",
                                color: "#3F3F3F",
                                lineHeight: "1.6",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        </p>
                    </div>

                    {/* Second Column */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                            </div>
                        </div>

                        <h2
                            className="font-semibold text-gray-900 leading-tight"
                            style={{
                                fontSize: "clamp(16px, 3vw, 18px)",
                                lineHeight: "1.3",
                            }}
                        >
                            Maintain Data Quality
                        </h2>

                        <p
                            className="leading-relaxed"
                            style={{
                                fontSize: "clamp(14px, 2.5vw, 16px)",
                                color: "#3F3F3F",
                                lineHeight: "1.6",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
