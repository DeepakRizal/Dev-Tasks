import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Board, Column } from "../../types/team";
import ColumnCard from "../../components/project/ColumnCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

// Types
interface Task {
  id: string;
  title: string;
  description?: string;
}

type ColumnKey = "todo" | "inProgress" | "completed";

type Columns = {
  todo: Column;
  inProgress: Column;
  completed: Column;
};

const ProjectBoard: React.FC = () => {
  const { teamId, projectId } = useParams<{
    teamId: string;
    projectId: string;
  }>();

  const teams = useSelector((state: RootState) => state.team.teams);

  const team = teams.find((team) => team.id === teamId);

  const project = team?.projects.find((project) => project.id === projectId);
  const data = project?.board as Board;

  // Fixed columns state
  const [columns, setColumns] = useState<Columns>(data);

  const [activeInput, setActiveInput] = useState<ColumnKey | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const addTask = (columnId: ColumnKey) => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
    };

    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, newTask],
      },
    }));

    setNewTaskTitle("");
    setActiveInput(null);
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

        {/* Project Info */}
        <div className="bg-gray-900 border border-slate-700 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl">{project?.emoji}</span>
              <div>
                <h1 className="text-xl font-bold">{project?.name}</h1>
                <p className="text-gray-400 text-sm">{project?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Status:</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    project?.status === "Active"
                      ? "bg-green-900 text-green-300"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {project?.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Owner:</span>
                <span className="text-white">{project?.owner}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(columns) as ColumnKey[]).map((key) => (
            <ColumnCard
              key={key}
              column={columns[key]}
              isActive={activeInput === key}
              setActiveInput={setActiveInput}
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              addTask={addTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;
