import "./globals.css";

// UPDATE MEE global font
import { Poppins } from "next/font/google";
const globalFont = Poppins({ subsets: ["latin"], weight: "300" });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
// UPDATE MEE page metadata
export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Waylon next js template",
  description: "Template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={globalFont.className}>{children}</body>
    </html>
  );
}
