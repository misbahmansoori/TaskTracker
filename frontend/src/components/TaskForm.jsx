import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { FaPlus, FaEdit, FaTimes } from "react-icons/fa";
import api from "../services/api";
import { toast } from "react-toastify";

function TaskForm({ fetchTasks, selectedTask, setSelectedTask }) {
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

      console.log("FORM DATA SENT:", data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 sm:p-6 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-3 rounded-xl">
          {selectedTask ? (
            <FaEdit className="text-white text-lg" />
          ) : (
            <FaPlus className="text-white text-lg" />
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedTask ? "Edit Task" : "Add Task"}
          </h2>

          <p className="text-sm text-gray-500">
            {selectedTask ? "Update your task details" : "Create a new task"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Task title"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", {
              required: "Title is required",
            })}
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <textarea
          placeholder="Task description"
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
          {...register("description")}
        />

        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          {...register("dueDate")}
        />

        <select
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          {...register("status")}
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          {selectedTask ? <FaEdit /> : <FaPlus />}
          {selectedTask ? "Update Task" : "Add Task"}
        </button>

        {selectedTask && (
          <button
            type="button"
            onClick={() => {
              reset();
              setSelectedTask(null);
            }}
            className="w-full mt-3 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
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
