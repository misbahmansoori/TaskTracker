function Footer() {
  return (
    <footer className="mt-12 bg-slate-900 border-t border-slate-700">
<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <p className="font-medium">
          Built using the MERN Stack
        </p>

        <p className="text-sm mt-2 text-gray-500">
          © {new Date().getFullYear()} Task Tracker. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;