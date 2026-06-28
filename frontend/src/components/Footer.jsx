function Footer({ darkMode }) {
  return (
    <footer
      className={
        darkMode
          ? "mt-12 bg-slate-900 border-t border-slate-700"
          : "mt-12 bg-white border-t border-gray-200"
      }
    >
      <div
        className={
          darkMode
            ? "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400"
            : "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-600"
        }
      >
        <p className="font-medium">
          Built using the MERN Stack
        </p>

        <p
          className={
            darkMode
              ? "text-sm mt-2 text-gray-500"
              : "text-sm mt-2 text-gray-500"
          }
        >
          © {new Date().getFullYear()} Task Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;