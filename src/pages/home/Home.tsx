const Home = () => {
  return (
    <section className="text-white bg-black h-[calc(100vh-65px)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl  font-grotesk md:text-6xl font-bold mb-4">
        Collaborate. Assign. Build.
      </h1>
      <p className="text-lg md:text-xl mb-8 font-poppins text-muted">
        Sign up to start building your dev teams.
      </p>
      <button className="bg-primary cursor-pointer font-poppins text-black px-6 py-3 rounded text-lg hover:bg-orange-600">
        Get Started
      </button>
    </section>
  );
};

export default Home;
