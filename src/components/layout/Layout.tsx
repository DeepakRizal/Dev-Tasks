import type React from "react";
import Navbar from "../navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-auto bg-black">{children}</div>
    </div>
  );
};

export default Layout;
