import { createClient } from "@/utils/supabase/client";

export default function CreateToDo({ todos, setTodos }) {
  const supabase = createClient();

  async function insertTodo(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const date = event.target.date.value;

    const { data, error } = await supabase
      .from("todosnew")
      .insert([
        {
          title: title,
          description: description == "" ? null : description,
          due_date: date == "" ? null : date,
          complete: false,
          user_id: (await supabase.auth.getUser()).data.user.id,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      return;
    }
    setTodos([...todos, data[0]]);
    const dialog = document.getElementById("todo_modal");
    if (dialog) dialog.close();
  }

  return (
    <>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => {
          const dialog = document.getElementById("todo_modal");
          if (dialog) dialog.showModal();
        }}
      >
        Create new to-do
      </button>

      <dialog id="todo_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New to-do</h3>

          <form onSubmit={insertTodo}>
            <label htmlFor="title" className="block mt-2 text-sm text-gray-600">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg mt-1"
            />

            <label
              htmlFor="description"
              className="block mt-2 text-sm text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              type="text"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg mt-1"
              rows={4}
            />

            <label htmlFor="date" className="block mt-2 text-sm text-gray-600">
              Complete by
            </label>
            <input
              id="date"
              name="date"
              type="date"
              // value={date}
              // onChange={(e) => setDate(e.target.value)}
              className="w-full px-2 py-1 border rounded-lg mt-1"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-primary mt-5"
                // onClick={insertTodo}
              >
                Create
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
