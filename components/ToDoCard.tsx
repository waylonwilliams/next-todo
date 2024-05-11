import { ToDoType } from "./ToDoTypes";
import Image from "next/image";

interface Props {
  todo: ToDoType;
}

export default function ToDoCard({ todo }: Props) {
  return (
    <div className="w-1/2 bg-base-100 shadow-xl p-6 rounded-lg m-2 relative">
      <div className="flex items-center">
        <h2
          className={
            "font-bold text-xl" +
            (todo.complete ? " text-base-300" : "") +
            (todo.description == null ? " mb-6" : "")
          }
        >
          {todo.title}
        </h2>
        <h6 className="ml-5">Due: {todo.due_date}</h6>
      </div>
      <p className={"w-4/5" + (todo.complete ? " text-gray-200" : "")}>
        {todo.description}
      </p>

      {/* COMPLETE  */}
      <div className="card-actions absolute right-2 bottom-3">
        <button className="btn btn-sm btn-circle btn-primary">
          <Image
            src={"/images/check.svg"}
            alt="Complete"
            width={30}
            height={30}
          />
        </button>
      </div>

      {/* EDIT */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        <Image src="/images/pencil.png" alt="Edit" width={20} height={20} />
      </button>
    </div>
  );
}
