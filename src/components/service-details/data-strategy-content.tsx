import Image from "next/image";

export default function DataStrategyContent() {
    return (
        <section className="py-8 lg:py-20">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1
                        className="font-bold mb-6"
                        style={{
                            fontSize: "40px",
                            color: "#323232",
                            lineHeight: "1.2",
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur. Id
                    </h1>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Protect Your Data</h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            We use industry-leading encryption, secure cloud infrastructure, and strict access controls to ensure your business information stays protected—at every stage of the analytics process.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Know Your Data</h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            Know your data. We turn raw numbers into meaningful insights, giving you a clear view of your business performance—so you can understand what&apos;s working, spot trends early, and make confident, data-driven decisions.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Rule Your Data</h2>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            Rule your data. Take control with powerful tools that let you organize, filter, and command your metrics with ease. Our platform puts you in the driver&apos;s seat—so you&apos;re not just watching data, you&apos;re leading with it.
                        </p>
                    </div>
                </div>


                <div className="w-full flex justify-center">
                    <div className="w-full">
                        <Image
                            src="/images/service_details.png"
                            alt="Data workflow illustration showing the complete data lifecycle with collection, analysis, generation, and storage stages"
                            width={1000}
                            height={1000}
                            className="w-full aspect-[5/2] object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
