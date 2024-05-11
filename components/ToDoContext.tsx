import { createContext } from "react";
import { ToDoType } from "./ToDoTypes";
import React from "react";

const todoContext = createContext<{
  todos: ToDoType[];
  setTodos: React.Dispatch<React.SetStateAction<ToDoType[]>>;
} | null>(null);

export default todoContext;
