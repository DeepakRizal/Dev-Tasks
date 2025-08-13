import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick() {
    navigate("/dashboard");
    onCloseSidebar();
  }

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

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
            <li
              onClick={handleClick}
              className="mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
            >
              Dashboard
            </li>
          </ul>
          <div className="flex items-center justify-center mt-8">
            <Button
              text="Logout"
              onClick={handleLogout}
              variant="primary"
              size="md"
              className="bg-red-500 py-1 hover:bg-red-600"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSideBar;
