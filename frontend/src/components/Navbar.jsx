import { FaTasks, FaMoon, FaSun } from "react-icons/fa";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav
      className={
        darkMode
          ? "bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 shadow-xl border-b border-slate-700"
          : "bg-white shadow-md border-b border-gray-200"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FaTasks className="text-xl text-white" />
          </div>

          <div>
            <h1
              className={
                darkMode
                  ? "text-xl sm:text-2xl font-bold tracking-wide text-white"
                  : "text-xl sm:text-2xl font-bold tracking-wide text-gray-900"
              }
            >
              Task Tracker
            </h1>

            <p
              className={
                darkMode
                  ? "hidden sm:block text-xs text-gray-400"
                  : "hidden sm:block text-xs text-gray-500"
              }
            >
              Manage your daily tasks efficiently
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={
              darkMode
                ? "bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition"
                : "bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition"
            }
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-700" />
            )}
          </button>

          <span
            className={
              darkMode
                ? "hidden md:block text-sm text-gray-300 font-medium"
                : "hidden md:block text-sm text-gray-600 font-medium"
            }
          >
            Stay Organized
          </span>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;