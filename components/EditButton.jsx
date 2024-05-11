import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import todoContext from "./ToDoContext";

export default function EditButton({ todo }) {
  const { todos, setTodos } = useContext(todoContext);

  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  async function insertTodo(event) {
    event.preventDefault();

    const { data, error } = await supabase
      .from("todosnew")
      .update([
        {
          title: title,
          description: description == "" ? null : description,
          due_date: date == "" ? null : date,
          user_id: (await supabase.auth.getUser()).data.user.id,
        },
      ])
      .eq("id", todo.id)
      .select();

    if (error) {
      console.error(error);
      return;
    }

    // remove old todo and insert new one
    const filteredTodos = todos.filter((t) => t.id !== todo.id);
    setTodos([...filteredTodos, data[0]]);

    const dialog = document.getElementById("todo_modal_2");
    if (dialog) dialog.close();
  }

  useEffect(() => {}, [title]);

  return (
    <>
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => {
          // states are updating but the inputs are not, I thought they rely on the state's value?
          console.log(
            "Title: ",
            title,
            todo.title,
            "Description: ",
            description,
            todo.description,
            "Date: ",
            date,
            todo.due_date
          );
          setTitle(todo.title);
          setDescription(todo.description | "");
          setDate(todo.due_date | "");

          const dialog = document.getElementById("todo_modal_2");
          if (dialog) dialog.showModal();
        }}
      >
        <Image src="/images/pencil.png" alt="Edit" width={20} height={20} />
      </button>

      <dialog id="todo_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update to-do</h3>

          <label
            htmlFor="editTitle"
            className="block mt-2 text-sm text-gray-600"
          >
            Title
          </label>
          <input
            id="editTitle"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg mt-1"
          />

          <label
            htmlFor="newDescription"
            className="block mt-2 text-sm text-gray-600"
          >
            Description {description}
          </label>
          <textarea
            id="newDescription"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg mt-1"
            rows={4}
          />

          <label htmlFor="newDate" className="block mt-2 text-sm text-gray-600">
            Complete by {date}
          </label>
          <input
            id="newDate"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-2 py-1 border rounded-lg mt-1"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary mt-5"
              onClick={insertTodo}
            >
              Update
            </button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
