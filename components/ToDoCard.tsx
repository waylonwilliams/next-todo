import { ToDoType } from "./ToDoTypes";

interface Props {
  todo: ToDoType;
}

export default function ToDoCard({ todo }: Props) {
  return (
    <div className="w-1/2 md:w-4/5 bg-base-100 shadow-xl p-6 rounded-lg m-2">
      <div className="flex">
        <h2
          className={
            "font-bold text-xl" + (todo.complete ? " text-base-300" : "")
          }
        >
          {todo.title}
        </h2>
        <h6 className="">{todo.due_date}</h6>
      </div>
      <p className={todo.complete ? "text-gray-200" : ""}>{todo.description}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Button</button>
      </div>
    </div>
  );
}
