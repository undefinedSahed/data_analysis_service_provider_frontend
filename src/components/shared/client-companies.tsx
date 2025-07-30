"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

const logos = [
  "/images/cl1.png",
  "/images/cl2.png",
  "/images/cl3.png",
  "/images/cl4.png",
  "/images/cl5.png",
  "/images/cl6.png",
  "/images/cl7.png",
  "/images/cl8.png",
  "/images/cl9.png",
  "/images/cl10.png",
];

export default function ClientCompanies() {
  const session = useSession();
  console.log(session);
  return (
    <div className="overflow-hidden w-full bg-white py-8 lg:py-20">
      <h2 className="text-center pb-4 lg:pb-12 text-xl lg:text-4xl font-bold">
        More Than 200+ Company Trusted Us
      </h2>
      <div className="flex animate-scroll gap-6 w-max">
        {[...logos, ...logos].map((src, i) => (
          <div
            key={i}
            className="flex items-center justify-center h-24 w-40 bg-gray-100 rounded-xl shadow-sm p-4"
          >
            <Image
              src={src}
              alt={`logo-${i}`}
              width={1000}
              height={1000}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
