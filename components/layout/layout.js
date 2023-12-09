import { Footer } from "../footer/footer";
import Navbar from "../navbar/navbar";
import { EqubContext } from "../context/context";
import { useContext, useEffect } from "react";
import Toast from "../Toast/toaster";

export default function Layout({ children }) {
  const { toastNotification } =
    useContext(EqubContext);


  console.log("inside layout")
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <div className="flex justify-center">
          <Navbar />
        </div>
        <main>{children}</main>
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
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
