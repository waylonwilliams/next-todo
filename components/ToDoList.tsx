"use client";

import { useState } from "react";
import { ToDoType } from "./ToDoTypes";

interface Props {
  todos: ToDoType[];
}

export default function ToDoList({ todos }: Props) {
  return (
    <>
      {todos.map((todo) => (
        <div>{todo.title}</div>
      ))}
    </>
  );
}
