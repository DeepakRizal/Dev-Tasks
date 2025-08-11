import { X } from "lucide-react";

interface UserSideBarProps {
  onSideBarOpen: boolean;
  toggleSidebar: () => void;
  onCloseSidebar: () => void;
}

const UserSideBar = ({
  onSideBarOpen,
  toggleSidebar,
  onCloseSidebar,
}: UserSideBarProps) => {
  return (
    <>
      {onSideBarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed z-20 top-0 right-0 w-64 h-full  bg-gray-800 text-white transform rounded-tl-md rounded-bl-md transition-transform duration-300 ease-in-out ${
          onSideBarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={onCloseSidebar}
          className=" cursor-pointer absolute right-5 top-5"
        >
          <X />
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Sidebar Menu</h2>
          <ul>
            <li className="mb-2 hover:bg-gray-700 p-2 rounded">Home</li>
            <li className="mb-2 hover:bg-gray-700 p-2 rounded">About</li>
            <li className="mb-2 hover:bg-gray-700 p-2 rounded">Services</li>
            <li className="mb-2 hover:bg-gray-700 p-2 rounded">Contact</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserSideBar;
