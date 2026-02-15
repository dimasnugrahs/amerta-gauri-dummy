import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

function LayoutDashboard({ children }) {
  return (
    <main className="min-h-screen bg-company-50">
      {/* Grid hanya aktif di desktop (md ke atas) */}
      <div className="flex flex-col md:grid md:grid-cols-6 h-screen">
        {/* Sidebar Desktop: disembunyikan di mobile */}
        <div className="hidden md:block md:col-span-1 bg-company-50 shadow-lg border-r border-gray-200">
          <div className="text-company-950 h-full">
            <Sidebar />
          </div>
        </div>

        {/* Konten Utama */}
        <div className="lg:col-span-5 col-span-6 mx-4">
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto pt-2 md:pt-0 pb-24 md:pb-8">
            {children}
          </div>
        </div>

        {/* Sidebar Mobile: hanya muncul di mobile (hidden di md) */}
        <div className="md:hidden">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

export default LayoutDashboard;
