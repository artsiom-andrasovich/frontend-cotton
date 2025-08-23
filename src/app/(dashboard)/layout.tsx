"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-dvh flex flex-col">{children}</div>;
}
