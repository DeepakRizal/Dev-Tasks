import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../store/store";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  return (
    <div className="flex items-center justify-between bg-black text-white px-10 py-4">
      <Link to={"/"}>
        <h2 className=" font-bold text-xl">DevTasks</h2>
      </Link>
      {!currentUser ? (
        <div className="flex items-center gap-5">
          <Link
            to={"/login"}
            className="text-white hover:text-primary cursor-pointer"
          >
            Login
          </Link>
          <Link
            to={"/sign-up"}
            className="bg-primary cursor-pointer text-black px-4 py-2 rounded hover:bg-orange-600"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div>
          <div
            onClick={toggleSidebar}
            className="border flex gap-5 items-center  cursor-pointer border-gray-600 px-5 py-1.5 rounded-3xl"
          >
            <p>{currentUser.name}</p>
            <img
              className="h-6  rounded-md"
              src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
              alt="profile icon of the user"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
