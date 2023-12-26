import Link from 'next/link';

const Home = () => {
  console.log("iNSIDE HOME")
  return (
    <>
      <div className="w-full p-10 h-screen">
        <div className="w-full md:h-full flex items-center mt-20 flex-col space-y-16 ">
          <div className="flex p-8 flex-col space-y-5 md:w-2/4  mb-16">
            <span className="font-bold text-3xl md:text-5xl">WELCOME TO EQUB</span>
            <span className="font-medium text-3xl md:text-4xl">
              YOUR DIGITAL SAVINGS CIRCLE
            </span>
            <span className="font-medium text-2xl text-gray-400">
              DIVE INTO A MODERN WAY OF
            </span>
            <span className=" font-medium text-2xl text-gray-400">
              MANAGING SHARED FINANCIAL GOALS.
            </span>
          </div>
          <div className="flex flex-col gap-8 md:flex-row md:space-x-8 md:w-3/5 ">
            <Link href="/exploreEqubs" className="p-8 border-gray-10 w-full flex justify-center items-center hover:bg-slate-50  border rounded-md  text-lg font-lg">
              EXPLORE EQUBS
            </Link>
            <button className=" p-8  bg-slate-100 w-full flex justify-center items-center hover:bg-slate-200  rounded-md text-lg font-lg">
              HOW IT WORKS
            </button>
            <Link
              href="/createEqub"
              className="p-8 MB-24 border-gray-10 hover:bg-slate-50 w-full flex justify-center items-center border rounded-md border text-lg font-lg"
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
