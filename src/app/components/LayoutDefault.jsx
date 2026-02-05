import Footer from "./Footer";
import Navbar from "./Navbar";

function LayoutDefault({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="grow px-6 py-10 md:px-20 lg:py-10">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default LayoutDefault;
