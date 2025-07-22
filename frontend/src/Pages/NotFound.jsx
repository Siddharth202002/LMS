import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      className=" flex
     flex-col justify-center items-center h-screen w-full bg-[#1A2238] "
    >
      <h1 className=" text-9xl font-extrabold text-white tracking-widest ">
        404
      </h1>

      <div className=" bg-black text-white px-2 text-sm rounded rotate-12 absolute ">
        Page not found ...
      </div>

      <button className="mt-5">
        <a className=" relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500   focus:outline-none focus:ring">
          <span
            className=" relative  px-8 py-3 block bg-[#1A2238]  border border-current"
            onClick={() => navigate(-1)}
          >
            Go Back!
          </span>
        </a>
      </button>
    </div>
  );
}

export default NotFound;
