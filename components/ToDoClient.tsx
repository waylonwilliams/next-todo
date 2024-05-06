"use client";
import CreateToDo from "./CreateToDo.jsx";
import ToDoList from "./ToDoList";
import { useState } from "react";

export default function ToDoClient() {
  const [todos, setTodos] = useState([]);

  return (
    <>
      <CreateToDo />
      <ToDoList />
    </>
  );
}
