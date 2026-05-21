export default function TaskCard({ task, completeTask, deleteTask }) {
  return (
    <div
      className={`p-4 rounded-2xl shadow-lg border ${
        task.status === "Completed"
          ? "bg-green-900 border-green-500"
          : "bg-slate-800 border-slate-600"
      }`}
    >
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-gray-300">{task.description}</p>

      <p className="mt-2">
        Status: <span className="font-bold">{task.status}</span>
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => completeTask(task._id)}
          className="bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600"
        >
          Done
        </button>

        <button
          onClick={() => deleteTask(task._id)}
          className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}