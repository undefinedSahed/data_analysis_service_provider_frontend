import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import { QueryProvider } from "@/providers/query-provider";
import LayoutVisibilityWrapper from "@/providers/layout-visibility-wraper";
import { Toaster } from "sonner";
import SessionWrapper from "@/providers/session-wrapper";

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "QUANTIVO",
  description: "Connecting hearts through meaningful dedications...."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased`}
      >
        <SessionWrapper>
          <QueryProvider>
            <LayoutVisibilityWrapper>
              {children}
              <Toaster position="top-right" />
            </LayoutVisibilityWrapper>
          </QueryProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
