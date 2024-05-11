"use client";
import { User } from "@supabase/supabase-js";
import CreateToDo from "./CreateToDo.jsx";
import ToDoList from "./ToDoList";
import { useCallback, useEffect, useState } from "react";
import { ToDoType } from "./ToDoTypes";
import { createClient } from "@/utils/supabase/client";

interface Props {
  user: User | null;
}

export default function ToDoClient({ user }: Props) {
  const supabase = createClient();
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [editTodo, setEditTodo] = useState<ToDoType>({} as ToDoType);

  const getTodo = useCallback(async () => {
    console.log("Fetching todos");
    const { data, error } = await supabase
      .from("todosnew")
      .select()
      .eq("user_id", user?.id);
    // order db fetch by due date and completion
    if (error) {
      console.error(error);
    } else {
      setTodos(data);
    }
  }, [supabase, user]);

  useEffect(() => {
    getTodo();
  }, [user, getTodo]);

  return (
    <>
      <CreateToDo todos={todos} setTodos={setTodos} />
      <ToDoList
        todos={todos}
        setTodos={setTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        user={user}
      />
    </>
  );
}
