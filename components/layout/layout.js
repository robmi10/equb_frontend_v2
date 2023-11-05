import { Footer } from "../footer/footer";
import Navbar from "../navbar/navbar";

export default function Layout({ children }) {
  console.log("inside layout")
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between">
        <div className="flex justify-center">
          <Navbar />
        </div>
        <main>{children}</main>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
