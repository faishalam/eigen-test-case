"use client";
import { AllNewsProvider } from "./hooks";

export default function AllNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AllNewsProvider>{children}</AllNewsProvider>
    </>
  );
}
