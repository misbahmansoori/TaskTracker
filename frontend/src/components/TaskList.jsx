import { FaClipboardList } from "react-icons/fa";
import TaskCard from "./TaskCard";

function TaskList({
  tasks = [],
  fetchTasks,
  setSelectedTask,
  loading,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>

        <p className="mt-5 text-gray-500 font-medium">
          Loading tasks...
        </p>
      </div>
    );
  }

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center">

        <div className="flex justify-center mb-5">
          <div className="bg-blue-100 p-5 rounded-full">
            <FaClipboardList className="text-4xl text-blue-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          No Tasks Yet
        </h2>

        <p className="text-gray-500 mt-3 max-w-sm mx-auto">
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
        />
      ))}
    </div>
  );
}

export default TaskList;