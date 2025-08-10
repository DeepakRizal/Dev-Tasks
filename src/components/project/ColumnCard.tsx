import { Plus } from "lucide-react";
import type { ColumnKey, Task } from "../../types/team";
import type React from "react";

// Interface for board display columns that includes tasks
interface BoardColumn {
  id: string;
  title: string;
  emoji: string;
  tasks: Array<{
    id: string;
    title: string;
    description?: string;
  }>;
}

interface ColumnCardProps {
  column: BoardColumn;
  isActive: boolean;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  setActiveInput: (value: ColumnKey | null) => void;
  addTask: (columnId: ColumnKey) => void;
}

const ColumnCard = ({
  column,
  isActive,
  task,
  setTask,
  setActiveInput,
  addTask,
}: ColumnCardProps) => {
  function handleChange(value: string, identifier: string) {
    setTask((prevTask) => ({ ...prevTask, [identifier]: value }));
  }

  return (
    <div className="bg-gray-900 border border-slate-700 rounded-lg p-4">
      {/* Column Header */}
      <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-slate-700">
        <span className="text-lg">{column.emoji}</span>
        <h3 className="text-lg font-semibold text-white">{column.title}</h3>
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
              <p className="text-gray-400 text-xs ml-5">{task.description}</p>
            )}
          </div>
        ))}

        {/* Add Task */}
        {isActive ? (
          <div className="bg-gray-800 border border-slate-600 rounded-lg p-3">
            <input
              type="text"
              value={task.title}
              name="title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, e.target.name)
              }
              placeholder="Enter task title..."
              className="w-full bg-transparent text-white text-sm outline-none mb-2"
            />
            <textarea
              value={task.description}
              name="description"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(e.target.value, e.target.name)
              }
              placeholder="Enter task title..."
              className="w-full bg-transparent text-white text-sm outline-none mb-2"
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => addTask(column.id as ColumnKey)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setActiveInput(null);
                  setTask({
                    id: "",
                    title: "",
                    columnId: "",
                    description: "",
                  });
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setActiveInput(column.id as ColumnKey)}
            className="w-full bg-gray-800 hover:bg-gray-700 border border-slate-600 border-dashed rounded-lg p-3 text-gray-400 hover:text-white transition-colors flex items-center justify-center space-x-2"
          >
            <Plus size={16} />
            <span className="text-sm">Add Task</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ColumnCard;
