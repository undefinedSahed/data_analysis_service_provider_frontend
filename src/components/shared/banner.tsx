"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Banner() {
    const pathname = usePathname();

    // Convert pathname to breadcrumb array
    const getBreadcrumbs = () => {
        // Remove leading/trailing slashes and split
        const segments = pathname.split("/").filter(Boolean);
        // If empty, means home
        if (segments.length === 0) return ["Home"];
        return ["Home", ...segments.map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))];
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <section
            className="text-white relative"
            style={{
                background:
                    "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/images/banner.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="container mx-auto h-screen flex items-center">
                <div className="lg:max-w-[55%] text-center lg:text-start">
                    <div className="pb-2 absolute top-32 -mt-10 text-sm lg:text-base text-gray-200">
                        {breadcrumbs.map((crumb, idx) => {
                            const isHome = idx === 0;
                            const isLast = idx === breadcrumbs.length - 1;

                            // Rebuild the link for each crumb if you want full breadcrumb navigation.
                            const href = isHome
                                ? "/"
                                : "/" + pathname
                                    .split("/")
                                    .filter(Boolean)
                                    .slice(0, idx)
                                    .join("/");

                            return (
                                <span key={idx}>
                                    {isHome ? (
                                        <Link href={href} className="hover:underline">
                                            {crumb}
                                        </Link>
                                    ) : (
                                        <span>{crumb}</span>
                                    )}
                                    {!isLast && " > "}
                                </span>
                            );
                        })}
                    </div>
                    <h1 className="font-bold lg:leading-[120%] text-[30px] lg:text-6xl pb-8">
                        Smarter Metrics. Sharper Business Moves.
                    </h1>
                    <p className="text-justify lg:text-start text-lg leading-[150%] pb-8">
                        We transform your raw business data into clear, actionable insights
                        that drive real growth. Our platform automatically collects,
                        analyzes, and visualizes your key metrics—turning complex datasets
                        into easy-to-understand reports tailored to your goals.
                    </p>
                    <Button>
                        <Link href="/solution#services">Book Now</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
