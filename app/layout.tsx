import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scaffio — Where Mathematics Finds Its Meaning",
  description: "AI-powered maths learning platform for UK secondary school students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
