import type React from "react";
import Navbar from "../navbar/Navbar";
import UserSideBar from "../sidebar/UserSideBar";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleToggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function handleCloseSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar toggleSidebar={handleToggleSidebar} />
      <div className="flex-1 overflow-auto bg-black">
        {children}
        <UserSideBar
          onSideBarOpen={isSidebarOpen}
          toggleSidebar={handleToggleSidebar}
          onCloseSidebar={handleCloseSidebar}
        />
      </div>
    </div>
  );
};

export default Layout;
