import {
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from "react";
import TaskInputForm from "./TaskInputForm";
import TaskList from "./TaskList";

const ToDoList = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const memorizedTasks = localStorage.getItem("tasks");
      const parsed = memorizedTasks ? JSON.parse(memorizedTasks) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Error parsing tasks:", e);
      return [];
    }
  });
  const [inputValue, setInputValue] = useState("");
  const [taskDateTime, setTaskDateTime] = useState(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    const formatted = local.toISOString().slice(0, 16);
    return formatted;
  });
  const inputRef = useRef(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [optimisticList, setOptimisticList] = useOptimistic(tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    if (!taskDateTime) {
      alert("Please select a date and time for your task.");
      return;
    }

    // edit task
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = {
        ...updatedTasks[editIndex],
        text: inputValue,
        dateTime: taskDateTime,
      };
      startTransition(async () => {
        await new Promise((res) => setTimeout(res, 1000));
        const sortedTasks = [...updatedTasks].sort(
          (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
        );
        setTasks(sortedTasks);
        setEditIndex(null);
        setInputValue("");
        setTaskDateTime("");
        resetDateTime();
      });
      return;
    }

    // new task
    const newTask = {
      id: crypto.randomUUID(),
      text: inputValue,
      completed: false,
      dateTime: taskDateTime,
    };
    setOptimisticList((prev) => [...prev, newTask]);
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 1000));
      setTasks((prev) => {
        const updated = [...prev, newTask];
        return updated.sort(
          (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
        );
      });
      setInputValue("");
      resetDateTime();
      handleFocus();
    });
  };

  const resetDateTime = () => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    const formatted = local.toISOString().slice(0, 16);
    setTaskDateTime(formatted);
    return formatted;
  };

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleToggle = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleEdit = (index) => {
    setInputValue(tasks[index].text);
    setTaskDateTime(tasks[index].dateTime);
    setEditIndex(index);
    handleFocus();
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setEditIndex(null);
    setInputValue("");
    resetDateTime();
  };
  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-center  mb-4">
        📝 To-<span className="text-red-600">Do</span> List
      </h1>
      <TaskInputForm
        inputValue={inputValue}
        inputRef={inputRef}
        taskDateTime={taskDateTime}
        setTaskDateTime={setTaskDateTime}
        isEditing={editIndex !== null}
        handleSubmit={handleSubmit}
        setInputValue={setInputValue}
        isPending={isPending}
      />
      <TaskList
        optimisticList={optimisticList}
        editIndex={editIndex}
        isEditing={editIndex !== null}
        handleToggle={handleToggle}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isPending={isPending}
      />
    </div>
  );
};

export default ToDoList;
