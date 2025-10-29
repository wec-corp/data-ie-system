import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";


const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["vietnamese"],
});

export const metadata: Metadata = {
  title: "Hệ thống nhập/xuấy dữ liệu giám sát",
  description: "Monitoring Data Import/Export System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
