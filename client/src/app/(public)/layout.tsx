"use client";
import Navbar from "@/components/molecules/navbar";
import Footer from "@/components/molecules/footer";
import { ToastContainer } from "react-toastify";

type TProps = {
  children?: React.ReactNode;
};
const PrivateLayout: React.FC<TProps> = ({ children }) => {
  return (
    <div className="w-full max-w-full min-h-screen bg-gray-100">
      <Navbar />
      <main className="w-full h-full">{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};
export default PrivateLayout;
