import Link from "next/link";
import Navbar from "../navbar/navbar";

const Home = () => {
  return (
    <>
      <div className="w-screen h-screen">
        <div className="w-full h-full flex items-center mt-48 flex-col space-y-16">
          <div className=" flex flex-col space-y-5 items-center w-2/4 border-black-10 hover:bg-slate-50 border rounded-lg p-4 mb-16">
            <span className="font-bold text-5xl">Welcome to Equb</span>
            <span className="font-medium text-2xl">
              Your Digital Savings Circle
            </span>
            <span className=" font-medium  ">
              Dive into a modern way of managing shared financial goals.
            </span>
          </div>
          <div className="space-x-8 w-4/4">
            <button className=" p-8 border-black-10 hover:bg-slate-50 border text-lg font-lg">
              EXPLORE EQUBS
            </button>
            <button className=" p-8 border-black-10 hover:bg-slate-50 border text-lg font-lg">
              HOW IT WORKS
            </button>
            <Link
              href="/createEqub"
              className=" p-8 border-black-10 hover:bg-slate-50 border text-lg font-lg"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
