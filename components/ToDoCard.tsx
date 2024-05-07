import { ToDoType } from "./ToDoTypes";

interface Props {
  todo: ToDoType;
}

export default function ToDoCard({ todo }: Props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex">
          <h2
            className={"card-title" + (todo.complete ? " text-base-300" : "")}
          >
            {todo.title}
          </h2>
          <h6 className="">{todo.due_date}</h6>
        </div>
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
