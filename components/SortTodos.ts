import { ToDoType } from "./ToDoTypes";

export default function SortTodos(todos: ToDoType[]) {
  const sortedTodos = todos.sort((a, b) => {
    if (a.complete && !b.complete) return 1;
    if (!a.complete && b.complete) return -1;

    const aDate = new Date(a.due_date);
    const bDate = new Date(b.due_date);
    if (
      (a.due_date === null || a.due_date === "") &&
      (b.due_date === null || b.due_date === "")
    )
      return 0;
    if (a.due_date === null || a.due_date === "") return 1;
    if (b.due_date === null || b.due_date === "") return -1;

    if (aDate < bDate) return -1;
    if (bDate < aDate) return 1;
    return 0;
  });

  return sortedTodos;
}
