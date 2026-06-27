import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../services/api";
import Footer from "../components/Footer";

function Home() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/tasks");

      console.log("API Response:", res.data);

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

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {" "}
          {/* Left Side */}
          <TaskForm
            fetchTasks={fetchTasks}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
          {/* Right Side */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>

              <p className="text-gray-500 mt-1">
                Manage and track your daily tasks.
              </p>
            </div>
            {/* Search & Filter */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 mb-5 flex flex-col sm:flex-row gap-3">
              {" "}
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-48 border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
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
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
