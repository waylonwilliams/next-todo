import "./globals.css";

import { Nunito_Sans } from "next/font/google";
const globalFont = Nunito_Sans({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

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
    <html lang="en" className="bg-primary-100">
      <body className={globalFont.className}>{children}</body>
    </html>
  );
}
