import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Plus } from "lucide-react";

// Types
interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
}

interface Project {
  id: string;
  name: string;
  emoji: string;
  description: string;
  status: string;
  owner: string;
}

interface Column {
  id: string;
  title: string;
  emoji: string;
  tasks: Task[];
}

const ProjectBoard: React.FC = () => {
  const { teamId } = useParams<{ projectId: string; teamId: string }>();

  // Mock project data
  const project: Project = {
    id: "1",
    name: "DevForge Clone",
    emoji: "🛠️",
    description: "A comprehensive development platform clone",
    status: "Active",
    owner: "John Doe",
  };

  // Mock kanban data
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      emoji: "📝",
      tasks: [
        {
          id: "1",
          title: "Design login screen",
          description: "Create wireframes and mockups for the login interface",
        },
        {
          id: "2",
          title: "Create wireframes",
          description: "Design system wireframes for all main components",
        },
        {
          id: "3",
          title: "Create DB schema",
          description:
            "Design database schema for user management and projects",
        },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      emoji: "🔄",
      tasks: [
        {
          id: "4",
          title: "API integration",
          description:
            "Integrate REST APIs for user authentication and project management",
        },
        {
          id: "5",
          title: "Fix auth bug",
          description: "Resolve authentication token refresh issue",
        },
      ],
    },
    {
      id: "completed",
      title: "Completed",
      emoji: "✅",
      tasks: [
        {
          id: "6",
          title: "Landing page deployed",
          description: "Successfully deployed the main landing page",
        },
        {
          id: "7",
          title: "Setup repo & CI/CD",
          description: "Configured GitHub repository with automated deployment",
        },
        {
          id: "8",
          title: "Project created",
          description: "Initial project setup and configuration",
        },
      ],
    },
  ]);

  const [showAddTask, setShowAddTask] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = (columnId: string) => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
      };

      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
        )
      );

      setNewTaskTitle("");
      setShowAddTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to={`/teams/${teamId}`}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Back to Team Detail Page</span>
          </Link>
        </div>

        {/* Project Info Bar */}
        <div className="bg-gray-900 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{project.emoji}</span>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Project: {project.name}
                </h1>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Status:</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    project.status === "Active"
                      ? "bg-green-900 text-green-300"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Owner:</span>
                <span className="text-white">{project.owner}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              className="bg-gray-900 border border-slate-700 rounded-lg p-4"
            >
              {/* Column Header */}
              <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-slate-700">
                <span className="text-lg">{column.emoji}</span>
                <h3 className="text-lg font-semibold text-white">
                  {column.title}
                </h3>
                <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-800 border border-slate-600 rounded-lg p-3 hover:bg-gray-750 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start space-x-2 mb-2">
                      <span className="text-blue-400 text-sm">🔹</span>
                      <h4 className="text-white font-medium text-sm flex-1">
                        {task.title}
                      </h4>
                    </div>
                    {task.description && (
                      <p className="text-gray-400 text-xs ml-5">
                        {task.description}
                      </p>
                    )}
                  </div>
                ))}

                {/* Add Task Input */}
                {showAddTask === column.id ? (
                  <div className="bg-gray-800 border border-slate-600 rounded-lg p-3">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Enter task title..."
                      className="w-full bg-transparent text-white text-sm outline-none mb-2"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addTask(column.id);
                        } else if (e.key === "Escape") {
                          setShowAddTask(null);
                          setNewTaskTitle("");
                        }
                      }}
                    />
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => addTask(column.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowAddTask(null);
                          setNewTaskTitle("");
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Add Task Button */
                  <button
                    onClick={() => setShowAddTask(column.id)}
                    className="w-full bg-gray-800 hover:bg-gray-700 border border-slate-600 border-dashed rounded-lg p-3 text-gray-400 hover:text-white transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus size={16} />
                    <span className="text-sm">Add Task</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;
