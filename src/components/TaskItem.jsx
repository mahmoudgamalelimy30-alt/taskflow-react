import { memo } from "react";

const TaskItem = memo(
  ({ isBeingEdited, isLast, isPending, task, onToggle, onEdit, onDelete }) => {
    return (
      <li
        className={`flex justify-between items-center px-3 py-2 rounded-md ${
          isBeingEdited ? " bg-yellow-200" : "bg-gray-100"
        }`}
        style={{
          opacity: isLast && isPending ? 0.5 : 1,
          transition: "opacity 0.3 ease",
        }}
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="w-4 h-4 cursor-pointer outline-none outline-green-200"
          />
          <span
            className={`${task.completed ? "line-through text-gray-400" : ""}`}
          >
            {task.text}
          </span>
          <small className="text-gray-400 text-xs">
            {new Date(task.dateTime).toLocaleString()}
          </small>
          <button type="button" onClick={onEdit} className="hover:bg-blue-200">
            ✏️
          </button>
          <button type="button" onClick={onDelete} className="hover:bg-red-200">
            ❌
          </button>
        </div>
      </li>
    );
  }
);

export default TaskItem;
