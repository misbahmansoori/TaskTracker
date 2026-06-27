import { FaTasks } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 shadow-xl border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FaTasks className="text-xl text-white" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-white">
              {" "}
              Task Tracker
            </h1>

            <p className="hidden sm:block text-xs text-gray-400">
              Manage your daily tasks efficiently
            </p>
          </div>
        </div>

        <span className="hidden md:block text-sm text-gray-300 font-medium">
          Stay Organized
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
