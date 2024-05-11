import { ToDoType } from "./ToDoTypes";
import Image from "next/image";
import EditButton from "./EditButton.jsx";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import SortTodos from "./SortTodos";
import { useEffect } from "react";

interface Props {
  todo: ToDoType;
  setEditTodo: React.Dispatch<React.SetStateAction<ToDoType>>;
  user: User | null;
  todos: ToDoType[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
}

export default function ToDoCard({
  todo,
  setEditTodo,
  user,
  todos,
  setTodos,
}: Props) {
  const supabase = createClient();

  async function setComplete() {
    const { data, error } = await supabase
      .from("todosnew")
      .update([
        {
          user_id: user?.id,
          complete: !todo.complete,
        },
      ])
      .eq("id", todo.id)
      .select();

    if (error) {
      console.error(error);
      return;
    }

    const filteredTodos = todos.filter((t) => t.id !== todo.id);
    const sortedTodos = SortTodos([...filteredTodos, data[0]]);
    setTodos(sortedTodos);
  }

  const date = new Date(todo.due_date);
  const currentYear = new Date().getFullYear();
  const formattedDate = `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getDate()}${
    date.getFullYear() !== currentYear ? ", " + date.getFullYear() : ""
  }`;

  return (
    <div className="w-1/2 bg-base-100 shadow-xl p-6 rounded-lg m-2 relative">
      <div className="flex justify-between">
        <h2
          className={
            "font-bold text-xl" +
            (todo.complete ? " text-base-300" : "") +
            (todo.description == null ? " mb-6" : "")
          }
        >
          {todo.title}
        </h2>
        {todo.due_date !== "" && todo.due_date !== null && (
          <h6
            className={
              "absolute right-12 top-4" +
              (todo.complete ? " text-gray-200" : "")
            }
          >
            {formattedDate}
          </h6>
        )}
      </div>
      <p className={"w-4/5" + (todo.complete ? " text-gray-200" : "")}>
        {todo.description}
      </p>

      {/* COMPLETE  */}
      <div className="card-actions absolute right-2 bottom-3">
        {todo.complete && (
          <button
            className={"btn btn-sm btn-circle btn-ghost"}
            onClick={setComplete}
          >
            <Image
              src={"/images/x.svg"}
              alt="Complete"
              width={30}
              height={30}
            />
          </button>
        )}
        {!todo.complete && (
          <button
            className={"btn btn-sm btn-circle btn-primary"}
            onClick={setComplete}
          >
            <Image
              src={"/images/check.svg"}
              alt="Complete"
              width={30}
              height={30}
            />
          </button>
        )}
      </div>

      {/* EDIT */}
      <EditButton todo={todo} setEditTodo={setEditTodo} />
    </div>
  );
}
