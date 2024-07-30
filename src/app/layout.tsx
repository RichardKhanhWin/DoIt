import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/variables.css"
import "@/styles/globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoIt",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeToggle />
        {children}
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
