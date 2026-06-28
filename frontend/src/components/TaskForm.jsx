import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaPlus, FaEdit, FaTimes } from "react-icons/fa";
import api from "../services/api";
import { toast } from "react-toastify";

function TaskForm({ fetchTasks, selectedTask, setSelectedTask, darkMode }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedTask) {
      reset({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        status: selectedTask.status || "Pending",
        dueDate: selectedTask.dueDate
          ? selectedTask.dueDate.substring(0, 10)
          : "",
      });
    }
  }, [selectedTask, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        description: data.description || "",
      };

      if (selectedTask) {
        await api.put(`/tasks/${selectedTask._id}`, payload);
        toast.success("Task updated successfully!");
        setSelectedTask(null);
      } else {
        await api.post("/tasks", payload);
        toast.success("Task added successfully!");
      }

      reset();
      fetchTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white rounded-2xl shadow-md border border-gray-700 p-5 sm:p-6 h-fit"
          : "bg-white text-gray-900 rounded-2xl shadow-md border border-gray-200 p-5 sm:p-6 h-fit"
      }
    >
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-3 rounded-xl">
          {selectedTask ? (
            <FaEdit className="text-white text-lg" />
          ) : (
            <FaPlus className="text-white text-lg" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {selectedTask ? "Edit Task" : "Add Task"}
          </h2>

          <p
            className={
              darkMode ? "text-sm text-gray-400" : "text-sm text-gray-500"
            }
          >
            {selectedTask
              ? "Update your task details"
              : "Create a new task"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* TITLE */}
        <div>
          <input
            type="text"
            placeholder="Task title"
            className={
              darkMode
                ? "w-full border border-gray-600 bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                : "w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            }
            {...register("title", {
              required: "Title is required",
            })}
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <textarea
          placeholder="Task description"
          rows={4}
          className={
            darkMode
              ? "w-full border border-gray-600 bg-gray-800 text-white rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              : "w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
          }
          {...register("description")}
        />

        {/* DATE */}
        <input
          type="date"
          className={
            darkMode
              ? "w-full border border-gray-600 bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              : "w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          }
          {...register("dueDate")}
        />

        {/* STATUS */}
        <select
          className={
            darkMode
              ? "w-full border border-gray-600 bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              : "w-full border border-gray-300 bg-white text-gray-900 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          }
          {...register("status")}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
        >
          {selectedTask ? <FaEdit /> : <FaPlus />}
          {selectedTask ? "Update Task" : "Add Task"}
        </button>

        {/* CANCEL */}
        {selectedTask && (
          <button
            type="button"
            onClick={() => {
              reset();
              setSelectedTask(null);
            }}
            className={
              darkMode
                ? "w-full mt-3 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                : "w-full mt-3 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
            }
          >
            <FaTimes />
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;