import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Deans | Landmarks that outlive the men who build them",
  description:
    "Deans Group builds landmarks across Peshawar, Islamabad and Karachi. Fifty-five years of construction that still stand on trust.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-body text-text-primary">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
