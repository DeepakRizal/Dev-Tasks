import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-black text-white px-10 py-4">
      <Link to={"/"}>
        <h2 className=" font-bold text-xl">DevTasks</h2>
      </Link>
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
    </div>
  );
};

export default Navbar;
