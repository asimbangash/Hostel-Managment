import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useGlobalHostelContext } from "../../store/context/hostels-context";

function AdminDashboard() {
  
  const { showSidebar } = useGlobalHostelContext();
  return (
    <div className="flex dark:text-white dark:bg-slate-800">
      {showSidebar && <Sidebar />}
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
