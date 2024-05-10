export default function CreateToDo() {
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

          <label htmlFor="title" className="block mt-2 text-sm text-gray-600">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
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
            className="w-full px-2 py-1 border rounded-lg mt-1"
            rows={4}
          />

          <label htmlFor="date" className="block mt-2 text-sm text-gray-600">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="w-full px-2 py-1 border rounded-lg mt-1"
          />

          <button className="btn btn-primary">Create</button>

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
