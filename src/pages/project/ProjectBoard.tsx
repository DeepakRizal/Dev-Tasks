import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ColumnKey, Task } from "../../types/team";
import ColumnCard from "../../components/project/ColumnCard";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { addTask } from "../../store/features/tasks/taskSlice";
import { v4 as uuid4 } from "uuid";

// Types

// Interface for board display columns that includes tasks
interface BoardColumn {
  id: string;
  title: string;
  emoji: string;
  tasks: Task[];
}

type Columns = {
  todo: BoardColumn;
  inProgress: BoardColumn;
  completed: BoardColumn;
};

const ProjectBoard: React.FC = () => {
  const { teamId, projectId } = useParams<{
    teamId: string;
    projectId: string;
  }>();

  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.project.projects);
  const boards = useSelector((state: RootState) => state.board.boards);
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const columns = useSelector((state: RootState) => state.task.columns);

  const project = projects.find((project) => project.id === projectId);
  const board = boards.find((board) => board.projectId === projectId);

  // Get columns for this specific board
  const boardColumns = columns.filter((col) => col.boardId === board?.id);

  // Create columns data structure for the board
  const boardColumnsData: Columns = {
    todo: {
      id: "todo",
      title: "To Do",
      emoji: "📝",
      tasks: tasks.filter((task) => {
        const column = boardColumns.find((col) => col.id === task.columnId);
        return column && column.title === "To Do";
      }),
    },
    inProgress: {
      id: "inProgress",
      title: "In Progress",
      emoji: "🔄",
      tasks: tasks.filter((task) => {
        const column = boardColumns.find((col) => col.id === task.columnId);
        return column && column.title === "In Progress";
      }),
    },
    completed: {
      id: "completed",
      title: "Completed",
      emoji: "✅",
      tasks: tasks.filter((task) => {
        const column = boardColumns.find((col) => col.id === task.columnId);
        return column && column.title === "Completed";
      }),
    },
  };

  const [activeInput, setActiveInput] = useState<ColumnKey | null>(null);
  const [task, setTask] = useState({
    id: "",
    title: "",
    columnId: "",
    description: "",
  });

  const addTaskHandler = (columnKey: ColumnKey) => {
    if (!task.title.trim() || !board) return;

    // Find the column ID for this board and column type
    const column = boardColumns.find((col) => {
      const isCorrectBoard = col.boardId === board.id;
      const isCorrectType =
        (columnKey === "todo" && col.title === "To Do") ||
        (columnKey === "inProgress" && col.title === "In Progress") ||
        (columnKey === "completed" && col.title === "Completed");
      return isCorrectBoard && isCorrectType;
    });

    if (!column) return;

    const newTask: Task = {
      id: uuid4(),
      title: task.title.trim(),
      description: task.description.trim(),
      columnId: column.id,
    };

    dispatch(addTask({ task: newTask, columnId: column.id }));

    setTask({
      id: "",
      title: "",
      columnId: "",
      description: "",
    });
    setActiveInput(null);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Project not found.</h2>
          <Link
            to={`/teams/${teamId}`}
            className="text-green-500 underline mt-4 inline-block"
          >
            Go back to Team Detail Page
          </Link>
        </div>
      </div>
    );
  }

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
            <span>Back to Team Detail Page.</span>
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
          {(Object.keys(boardColumnsData) as ColumnKey[]).map((key) => (
            <ColumnCard
              key={key}
              column={boardColumnsData[key]}
              isActive={activeInput === key}
              setActiveInput={setActiveInput}
              task={task}
              setTask={setTask}
              addTask={addTaskHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;
