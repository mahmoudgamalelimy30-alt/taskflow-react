import TaskItem from "./TaskItem";

const TaskList = ({
  optimisticList,
  editIndex,
  isEditing,
  handleToggle,
  handleEdit,
  handleDelete,
  isPending,
}) => {
  return (
    <ul className="space-y-2 mt-4">
      {optimisticList.map((task, index) => {
        const isBeingEdited = isEditing && index === editIndex;
        const isLast = !isEditing && index === optimisticList.length - 1;
        return (
          <TaskItem
            isLast={isLast}
            isBeingEdited={isBeingEdited}
            isPending={isPending}
            key={index}
            task={task}
            onEdit={() => handleEdit(index)}
            onToggle={() => handleToggle(index)}
            onDelete={() => handleDelete(index)}
          />
        );
      })}
    </ul>
  );
};

export default TaskList;
