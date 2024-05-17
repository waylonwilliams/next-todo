"use client";

import { ToDoType } from "./ToDoTypes";
import ToDoCard from "./ToDoCard";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import SortTodos from "./SortTodos";
import { useEffect, useState } from "react";

interface Props {
  todos: ToDoType[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
  editTodo: ToDoType;
  setEditTodo: React.Dispatch<React.SetStateAction<ToDoType>>;
  user: User | null;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToDoList({
  todos,
  setTodos,
  editTodo,
  setEditTodo,
  user,
  setToast,
}: Props) {
  const supabase = createClient();

  async function insertTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setToast(true);

    const formData = new FormData(event.currentTarget);

    const { data, error } = await supabase
      .from("todosnew")
      .update([
        {
          title: formData.get("title") as string,
          description: formData.get("description") as string,
          due_date: formData.get("date") as string,
          user_id: user?.id,
        },
      ])
      .eq("id", editTodo.id)
      .select();

    if (error) {
      console.error(error);
      return;
    }

    // remove old todo and insert new one
    const filteredTodos = todos.filter((t) => t.id !== editTodo.id);
    const sortedTodos = SortTodos([...filteredTodos, data[0]]);
    setTodos(sortedTodos);

    const dialog = document.getElementById("todo_modal_2") as HTMLDialogElement;
    if (dialog) dialog.close();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <ToDoCard
          todo={todo}
          key={todo.id}
          setEditTodo={setEditTodo}
          user={user}
          todos={todos}
          setTodos={setTodos}
        />
      ))}

      <dialog id="todo_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update to-do</h3>

          <form onSubmit={insertTodo}>
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
              value={editTodo.title || ""}
              onChange={(e) => {
                let newTodo = { ...editTodo };
                newTodo.title = e.target.value;
                setEditTodo(newTodo);
              }}
              className="w-full px-2 py-1 border rounded-lg mt-1"
            />

            <label
              htmlFor="newDescription"
              className="block mt-2 text-sm text-gray-600"
            >
              Description
            </label>
            <textarea
              id="newDescription"
              name="description"
              value={editTodo.description || ""}
              onChange={(e) => {
                let newTodo = { ...editTodo };
                newTodo.description = e.target.value;
                setEditTodo(newTodo);
              }}
              className="w-full px-2 py-1 border rounded-lg mt-1"
              rows={4}
            />

            <label
              htmlFor="newDate"
              className="block mt-2 text-sm text-gray-600"
            >
              Complete by
            </label>
            <input
              id="newDate"
              name="date"
              type="date"
              value={editTodo.due_date || ""}
              onChange={(e) => {
                let newTodo = { ...editTodo };
                newTodo.due_date = e.target.value;
                setEditTodo(newTodo);
              }}
              className="w-full px-2 py-1 border rounded-lg mt-1"
            />

            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary mt-5">
                Update
              </button>
            </div>
          </form>

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
