import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

import {
  FaTasks,
  FaCheck,
  FaTrash,
  FaSignOutAlt,
  FaBars,
  FaChartPie,
  FaClipboardList,
} from "react-icons/fa";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ ACTIVE PAGE
  const [activeTab, setActiveTab] = useState("dashboard");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  // ✅ FETCH TASKS
  const getTasks = async () => {

    try {

      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // ✅ ADD TASK
  const addTask = async () => {

    if (!title || !description) {
      return alert("Fill all fields");
    }

    try {

      await API.post(
        "/tasks",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");

      getTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ COMPLETE TASK
  const completeTask = async (id) => {

    try {

      await API.put(
        `/tasks/${id}`,
        {
          status: "Completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ DELETE TASK
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (

    <div className="min-h-screen flex bg-[#0b0f1a] text-white">

      {/* SIDEBAR */}
      <motion.div
        animate={{ width: sidebarOpen ? 250 : 85 }}
        className="card m-4 p-5 flex flex-col"
      >

        {/* TOP */}
        <div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-cyan-300 text-xl mb-8"
          >
            <FaBars />
          </button>

          {sidebarOpen && (
            <h1 className="text-3xl font-bold text-rainbow mb-10">
              TaskFlow
            </h1>
          )}

          {/* MENU */}
          <div className="space-y-4">

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <FaChartPie />
              {sidebarOpen && "Dashboard"}
            </button>

            <button
              onClick={() => setActiveTab("tasks")}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition ${
                activeTab === "tasks"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <FaClipboardList />
              {sidebarOpen && "Tasks"}
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition ${
                activeTab === "analytics"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              <FaTasks />
              {sidebarOpen && "Analytics"}
            </button>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="btn-rainbow mt-auto"
        >
          <FaSignOutAlt className="inline mr-2" />
          {sidebarOpen && "Logout"}
        </button>

      </motion.div>

      {/* MAIN */}
      <div className="flex-1 p-8 overflow-auto">

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (

          <>
            <h1 className="text-5xl font-bold text-rainbow mb-3">
              Dashboard 🚀
            </h1>

            <p className="text-gray-300 mb-10">
              Welcome to your premium task manager
            </p>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">

              <div className="card p-6">
                <p className="text-cyan-300 text-lg">
                  Total Tasks
                </p>

                <h1 className="text-5xl font-bold mt-3">
                  {tasks.length}
                </h1>
              </div>

              <div className="card p-6">
                <p className="text-green-300 text-lg">
                  Completed
                </p>

                <h1 className="text-5xl font-bold mt-3">
                  {completedTasks}
                </h1>
              </div>

              <div className="card p-6">
                <p className="text-pink-300 text-lg">
                  Pending
                </p>

                <h1 className="text-5xl font-bold mt-3">
                  {tasks.length - completedTasks}
                </h1>
              </div>

            </div>
          </>
        )}

        {/* TASKS TAB */}
        {activeTab === "tasks" && (

          <>
            <h1 className="text-5xl font-bold text-rainbow mb-8">
              Tasks ✨
            </h1>

            {/* ADD TASK */}
            <div className="card p-6 mb-10">

              <h2 className="text-2xl font-bold mb-5">
                Create Task
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

              </div>

              <button
                onClick={addTask}
                className="btn-rainbow mt-5"
              >
                Add Task
              </button>

            </div>

            {/* TASK LIST */}
            <div className="grid md:grid-cols-2 gap-6">

              {tasks.map((task) => (

                <motion.div
                  key={task._id}
                  whileHover={{ scale: 1.02 }}
                  className="card p-6"
                >

                  <div className="flex justify-between items-start">

                    <div>
                      <h2 className="text-2xl font-bold text-cyan-300">
                        {task.title}
                      </h2>

                      <p className="text-gray-300 mt-3">
                        {task.description}
                      </p>
                    </div>

                    <span
                      className={
                        task.status === "Completed"
                          ? "badge-green"
                          : "badge-yellow"
                      }
                    >
                      {task.status}
                    </span>

                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-4 mt-6">

                    <button
                      onClick={() => completeTask(task._id)}
                      className="btn-rainbow"
                    >
                      <FaCheck />
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="badge-red"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </motion.div>

              ))}

            </div>
          </>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (

          <>
            <h1 className="text-5xl font-bold text-rainbow mb-10">
              Analytics 📊
            </h1>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="card p-8">

                <h2 className="text-2xl font-bold text-cyan-300 mb-4">
                  Completion Rate
                </h2>

                <h1 className="text-6xl font-bold">
                  {tasks.length === 0
                    ? 0
                    : Math.round(
                        (completedTasks / tasks.length) * 100
                      )}
                  %
                </h1>

              </div>

              <div className="card p-8">

                <h2 className="text-2xl font-bold text-pink-300 mb-4">
                  Productivity
                </h2>

                <h1 className="text-6xl font-bold">
                  {completedTasks}
                </h1>

              </div>

            </div>
          </>
        )}

      </div>

    </div>
  );
}