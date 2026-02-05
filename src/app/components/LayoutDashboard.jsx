import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

function LayoutDashboard({ children }) {
  return (
    // Menggunakan Fragment atau div sebagai container root
    <>
      <main className="min-h-screen bg-company-50">
        <div className="grid grid-cols-6 h-screen">
          <div className="lg:block hidden col-span-1 bg-company-50 shadow-lg">
            <div className="text-company-950 h-full">
              <Sidebar />
            </div>
          </div>
          <div className="lg:col-span-5 col-span-6 mx-4">
            <DashboardHeader />
            {/* Di sini konten halaman (LandingPage, dll.) akan dirender */}
            {children}
          </div>
        </div>
      </main>
    </>
  );
}

export default LayoutDashboard;
