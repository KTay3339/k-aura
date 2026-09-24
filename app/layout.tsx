import type { Metadata } from "next";
import "./globals.css";
import "./theme.css";
import Concierge from "./concierge";

export const metadata: Metadata = {
  title: "K Aura | Flexible Salon Rentals in Hurst, TX",
  description: "Reserve a professional salon booth or private suite by the day at K Aura. No lease, no commission, and flexible 12-hour rentals.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}<Concierge /></body>
    </html>
  );
}
