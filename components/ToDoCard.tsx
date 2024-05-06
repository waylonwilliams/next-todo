import { ToDoType } from "./ToDoTypes";

interface Props {
  todo: ToDoType;
}

export default function ToDoCard({ todo }: Props) {
  console.log("card-title" + (todo.complete ? " text-gray-200" : ""));
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2
          className={
            "card-title" + (todo.complete ? " text-base-300 font-bold" : "")
          }
        >
          {todo.title}
        </h2>
        <p className={todo.complete ? "text-gray-200" : ""}>
          {todo.description}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Button</button>
        </div>
      </div>
    </div>
  );
}
