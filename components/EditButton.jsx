import Image from "next/image";

export default function EditButton({ todo, setEditTodo }) {
  return (
    <>
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => {
          setEditTodo(todo);
          const dialog = document.getElementById("todo_modal_2");
          if (dialog) dialog.showModal();
        }}
      >
        <Image src="/images/pencil.png" alt="Edit" width={20} height={20} />
      </button>
    </>
  );
}
