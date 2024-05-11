"use client";
import { User } from "@supabase/supabase-js";
import CreateToDo from "./CreateToDo.jsx";
import ToDoList from "./ToDoList";
import { useCallback, useEffect, useState } from "react";
import { ToDoType } from "./ToDoTypes";
import { createClient } from "@/utils/supabase/client";
import SortTodos from "./SortTodos";

interface Props {
  user: User | null;
}

export default function ToDoClient({ user }: Props) {
  const supabase = createClient();
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [editTodo, setEditTodo] = useState<ToDoType>({} as ToDoType);

  const getTodo = useCallback(async () => {
    const { data, error } = await supabase
      .from("todosnew")
      .select()
      .eq("user_id", user?.id);
    // order db fetch by due date and completion
    if (error) {
      console.error(error);
    } else {
      const sortedTodos = SortTodos(data);
      setTodos(sortedTodos);
    }
  }, [supabase, user]);

  useEffect(() => {
    getTodo();
  }, [user, getTodo]);

  return (
    <div className="flex flex-col mt-5 justify-center items-center">
      <CreateToDo todos={todos} setTodos={setTodos} />
      <ToDoList
        todos={todos}
        setTodos={setTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        user={user}
      />
    </div>
  );
}
