import Link from 'next/link';
import img1 from "../img/img1.jpg"
import img2 from "../img/img2.png"

const Home = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col md:flex-col justify-center items-center mt-24">
        <div className='flex gap-2 items-center flex-col md:flex-row'>
          <img className='rounded-md h-64' src={img1.src} />
          <div className='h-48 w-96 flex items-center justify-center text-4xl font-bold'>
            SAVE
          </div>
        </div>

        <div className='flex gap-2 items-center flex-col md:flex-row'>
          <div className='h-48 w-96 flex items-center justify-center text-4xl font-bold text-gray-300'>
            TOGETHER
          </div>
          <img className='rounded-md h-64' src={img2.src} />
        </div>
      </div>
      <div className="w-full p-10 h-screen mt-24">
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
            <Link href="/howitWorks" className=" p-8  bg-slate-100 w-full flex justify-center items-center hover:bg-slate-200  rounded-md text-lg font-lg">
              HOW IT WORKS
            </Link>
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
