import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../services/api";
import Footer from "../components/Footer";

function Home() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    completed: tasks.filter((t) => t.status === "Completed").length,
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || task.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);

      if (sortOrder === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);

      return 0;
    });

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-slate-100 text-gray-900"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskForm
            fetchTasks={fetchTasks}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            darkMode={darkMode}
          />

          <div className="md:col-span-2">
            {/* HEADER */}
            <div className="mb-6">
              <h2
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Dashboard
              </h2>

              <p
                className={`mt-1 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                Manage and track your daily tasks.
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div
                className={`rounded-2xl shadow-md p-4 ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Total
                </p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>

              <div
                className={`rounded-2xl shadow-md p-4 ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                <p className="text-sm text-yellow-500">Pending</p>
                <h3 className="text-2xl font-bold text-yellow-500">
                  {stats.pending}
                </h3>
              </div>

              <div
                className={`rounded-2xl shadow-md p-4 ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                <p className="text-sm text-blue-500">In Progress</p>
                <h3 className="text-2xl font-bold text-blue-500">
                  {stats.inProgress}
                </h3>
              </div>

              <div
                className={`rounded-2xl shadow-md p-4 ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                <p className="text-sm text-green-500">Completed</p>
                <h3 className="text-2xl font-bold text-green-500">
                  {stats.completed}
                </h3>
              </div>
            </div>

            {/* FILTER BAR */}
            <div
              className={`rounded-2xl shadow-md border p-4 mb-5 flex flex-col sm:flex-row gap-3 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`flex-1 rounded-lg border p-3 outline-none ${
                  darkMode
                    ? "bg-gray-900 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`rounded-lg border p-3 ${
                  darkMode
                    ? "bg-gray-900 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`rounded-lg border p-3 ${
                  darkMode
                    ? "bg-gray-900 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option>All</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <TaskList
              tasks={filteredTasks}
              fetchTasks={fetchTasks}
              setSelectedTask={setSelectedTask}
              loading={loading}
              darkMode={darkMode}
            />
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Home;