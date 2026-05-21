import { FaTasks } from "react-icons/fa";

export default function Navbar({ logout }) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-900 text-white shadow-md">
      
      <div className="flex items-center gap-2 text-xl font-bold">
        <FaTasks />
        Task Manager
      </div>

      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}