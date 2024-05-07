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

  const getTodo = useCallback(async () => {
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

  async function updateTodo({
    id,
    user_id,
    title,
    description,
    complete,
    due_date,
    created_at,
  }: ToDoType) {
    const { error } = await supabase.from("todosnew").upsert({
      id: id,
      user_id: user_id,
      title: title,
      description: description,
      complete: complete,
      due_date: due_date,
      created_at: created_at,
    });
    if (error) {
      console.error(error);
    } else {
      // set states instead of calling getTodo again
      getTodo();
    }
  }

  return (
    <>
      <CreateToDo />
      <ToDoList todos={todos} />
    </>
  );
}
