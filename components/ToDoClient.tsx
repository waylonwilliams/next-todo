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

  const getData = useCallback(async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user?.id);
    if (error) {
      console.error(error);
    } else {
      setTodos(data);
    }
  }, [supabase, user]);

  useEffect(() => {
    getData();
  }, [user, getData]);

  return (
    <>
      <CreateToDo />
      <ToDoList todos={todos} />
    </>
  );
}
