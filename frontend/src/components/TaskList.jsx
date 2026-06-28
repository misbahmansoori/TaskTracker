import TaskCard from "./TaskCard";

function TaskList({ tasks = [], fetchTasks, setSelectedTask, loading, darkMode }) {
  if (loading) {
    return (
      <div
        className={
          darkMode
            ? "bg-gray-900 rounded-2xl shadow-md border border-gray-700 p-12 flex flex-col items-center text-white"
            : "bg-white rounded-2xl shadow-md border border-gray-200 p-12 flex flex-col items-center"
        }
      >
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>

        <p className={darkMode ? "mt-5 text-gray-300 font-medium" : "mt-5 text-gray-500 font-medium"}>
          Loading tasks...
        </p>
      </div>
    );
  }

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div
        className={
          darkMode
            ? "bg-gray-900 rounded-2xl shadow-md border border-gray-700 p-10 text-center text-white"
            : "bg-white rounded-2xl shadow-md border border-gray-200 p-10 text-center"
        }
      >
        <div className="text-6xl mb-4">📭</div>

        <h2 className={darkMode ? "text-2xl font-bold text-white" : "text-2xl font-bold text-gray-700"}>
          No Tasks Yet
        </h2>

        <p className={darkMode ? "text-gray-300 mt-2" : "text-gray-500 mt-2"}>
          Create your first task and start organizing your work efficiently.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          fetchTasks={fetchTasks}
          setSelectedTask={setSelectedTask}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}

export default TaskList;