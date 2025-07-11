"use client";

import { DashboardProvider } from "./hooks";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardProvider>{children}</DashboardProvider>
    </>
  );
}
