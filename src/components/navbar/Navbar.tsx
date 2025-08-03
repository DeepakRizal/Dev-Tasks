import AuthButton from "../ui/AuthButton";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-10 py-4">
      <div>
        <h2 className=" font-bold text-xl">DevTasks</h2>
      </div>
      <div className="flex items-center gap-5">
        <AuthButton bgColor="bg-indigo-600" buttonText="Login" />
        <AuthButton bgColor="bg-gray-700" buttonText="Sign Up" />
      </div>
    </div>
  );
};

export default Navbar;
