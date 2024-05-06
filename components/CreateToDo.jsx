export default function CreateToDo() {
  return (
    <>
      <button
        className="btn"
        onClick={() => {
          const dialog = document.getElementById("todo_modal");
          if (dialog) dialog.showModal();
        }}
      >
        open modal
      </button>
      <dialog id="todo_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New item</h3>
          <p className="py-4">Content here</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
