import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timbo | Every Moment Easier",
  description: "Developed by ENS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
