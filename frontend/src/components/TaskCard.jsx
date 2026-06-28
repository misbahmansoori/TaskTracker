import api from "../services/api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

function TaskCard({ task, fetchTasks, setSelectedTask, darkMode }) {
  const [showModal, setShowModal] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "In Progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success("Task deleted successfully!");
      fetchTasks();
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <>
      <div
        className={
          darkMode
            ? "bg-gray-900 text-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-700 p-5"
            : "bg-white text-gray-900 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 p-5"
        }
      >
        {/* TITLE + STATUS */}
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">{task.title}</h3>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className={darkMode ? "mt-3 text-gray-300" : "mt-3 text-gray-600"}>
          {task.description || "No description provided."}
        </p>

        {/* DATE */}
        <p
          className={
            darkMode
              ? "flex items-center gap-2 text-sm text-gray-400 mt-4"
              : "flex items-center gap-2 text-sm text-gray-500 mt-4"
          }
        >
          <FaCalendarAlt className="text-blue-500" />

          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "No Due Date"}
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <button
            onClick={() => setSelectedTask(task)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition shadow-sm hover:shadow-md"
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition shadow-sm hover:shadow-md"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>

      {/* MODAL */}
      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        darkMode={darkMode}
      />
    </>
  );
}

export default TaskCard;