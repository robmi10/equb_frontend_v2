import { Footer } from "../footer/footer";
import Navbar from "../navbar/navbar";
import { EqubContext } from "../context/context";
import { useContext } from "react";
import Toast from "../Toast/toaster";
import { useEthers } from "@usedapp/core";

export default function Layout({ children }) {
  const { account } = useEthers();
  const { toastNotification } =
    useContext(EqubContext);

  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <div className="flex justify-center">
          <Navbar />
        </div>
        {account && <main>{children}</main>}
        {toastNotification && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-sm">
            <Toast
              title={toastNotification.title}
              description={toastNotification.desc}
              status={toastNotification.status}
              duration={4000}
              isClosable={true}
            />
          </div>
        )}
        {!account && <div className="h-screen w-screen flex justify-center items-center">
          <h1 className="animate-fadeSmooth text-2xl font-bold">CONNECT YOUR WALLET</h1>
        </div>}
        <div className="mt-48 md:mt-0">
          <Footer />
        </div>
      </div>
    </>
  );
}
