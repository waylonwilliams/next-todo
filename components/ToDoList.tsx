"use client";

import { useState } from "react";
import { ToDoType } from "./ToDoTypes";
import ToDoCard from "./ToDoCard";

interface Props {
  todos: ToDoType[];
}

export default function ToDoList({ todos }: Props) {
  return (
    <>
      {todos.map((todo) => (
        <ToDoCard todo={todo} key={todo.id} />
      ))}
    </>
  );
}
