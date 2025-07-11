"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>{children}</div>
    </Suspense>
  );
}
