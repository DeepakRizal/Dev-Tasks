import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className=" flex items-center h-[100%]  justify-center">
      <form>
        <h2 className="auth-heading-styles">Sign Up</h2>

        <div className="flex flex-col gap-5 items-center justify-center mb-4">
          <input className="auth-input-styles" placeholder="Name" type="text" />
          <input
            className="auth-input-styles"
            placeholder="E-mail"
            type="text"
          />
          <input
            type="password"
            className="auth-input-styles"
            placeholder="Password"
          />
          <input
            type="password"
            className="auth-input-styles"
            placeholder="Confirm Password"
          />
          <button
            className="py-2 font-bold text-white rounded-md w-full cursor-pointer hover:shadow-pink-500/50 transition-shadow duration-300"
            style={{
              background:
                "linear-gradient(to right, #db2777 0%, #db2777 80%, #f472b6 100%)",
            }}
          >
            Login
          </button>
        </div>

        <p className="text-white">
          already have an account?
          <Link className="font-bold" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
