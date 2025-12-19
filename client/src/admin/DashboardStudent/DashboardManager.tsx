import SideBarManager from "../../components/layout/SideBarManager";
import Card from "./Card";
import HeaderDashboard from "./HeaderDashboard";

export default function DashboardManager() {
  return (
    <div className="flex flex-row gap-6 min-h-screen bg-slate-50">
      <div className="w-64 shadow-slate-300">
        <SideBarManager />
      </div>
      <div className="flex-col flex-1 p-4">
        <div className="mb-12">
          <HeaderDashboard />
        </div>
        <div>
          <Card/>
        </div>
      </div>
    </div>
  );
}
