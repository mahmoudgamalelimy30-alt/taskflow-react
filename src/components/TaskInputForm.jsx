const TaskInputForm = ({
  inputRef,
  inputValue,
  isEditing,
  taskDateTime,
  setTaskDateTime,
  handleSubmit,
  setInputValue,
  isPending,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex flex-col sm:flex-row gap-2 ">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a new task..."
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input
          type="datetime-local"
          value={taskDateTime}
          onChange={(e) => setTaskDateTime(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          className="flex-1 border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className={`${
          isEditing
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-medium px-4 py-2 rounded-md transition w-full sm:w-auto ${
          isPending ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isPending
          ? isEditing
            ? "Updating..."
            : "Saving..."
          : isEditing
          ? "Update Task"
          : "Add Task"}
      </button>
    </form>
  );
};

export default TaskInputForm;
