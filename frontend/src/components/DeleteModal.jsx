import { FaTrashAlt, FaTimes } from "react-icons/fa";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5 sm:p-6">
        {" "}
        <div className="flex justify-center mb-5">
          <div className="bg-red-100 p-4 rounded-full">
            <FaTrashAlt className="text-red-600 text-3xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Delete Task
        </h2>
        <p className="text-center text-gray-500 mt-3 leading-relaxed">
          Are you sure you want to delete this task?
          <br />
          This action cannot be undone.
        </p>
        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
          >
            <FaTimes />
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all"
          >
            <FaTrashAlt />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
