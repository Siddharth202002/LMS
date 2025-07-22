import React from "react";
import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        403
      </h1>

      <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
        Access Denied
      </div>

      <button className="mt-5 relative" onClick={() => navigate(-1)}>
        <span className="text-2xl border border-white py-2 px-3 rounded-1xl">
          Go Back
        </span>
      </button>
    </main>
  );
}

export default Denied;
