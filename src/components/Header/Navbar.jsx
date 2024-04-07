import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between text-white">
        <img src="/Linkly.svg" alt="" />
        <section className="flex items-center  justify-center gap-5">
          <button className="flex items-center gap-2 h-14 w-28 justify-center rounded-full border border-[#252b37] bg-[#181e29]">
            Login <img src="/sign-in.svg" alt="" />
          </button>

          <button className="h-14 w-44 rounded-full font-semibold bg-[#144ee3]  max-md:hidden shadow-custom">
            Register Now
          </button>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
