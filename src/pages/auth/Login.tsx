import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className=" flex items-center h-[100%]  justify-center">
      <form>
        <h2 className="auth-heading-styles">Login</h2>

        <div className="flex flex-col gap-5 items-center justify-center mb-4">
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
          don't have an account?
          <Link className="font-bold" to={"/sign-up"}>
            Create a account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
