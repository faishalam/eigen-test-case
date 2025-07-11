"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivatePage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  return (
    <div className="w-[100%] h-[100%] items-center justify-center grid">
      <p>Redirecting...</p>
    </div>
  );
};
export default PrivatePage;
