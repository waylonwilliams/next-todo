import { useEffect } from "react";

interface Props {
  toast: boolean;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Toast({ toast, setToast }: Props) {
  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(false);
      }, 5000);
    }
  }, [toast]);

  return (
    <div
      className={
        "fixed left-1/2 -translate-x-1/2 mb-4 bg-green-300 transition-all duration-500 ease-in-out p-2 rounded-md border-2 border-green-400 flex"
      }
      style={{ bottom: toast ? "0px" : "-100px" }}
    >
      Updated successfully
      <button
        className="hover:bg-green-200 transition-all duration-150 ml-2 rounded-full p-1 w-6 h-6 flex items-center justify-center"
        onClick={() => setToast(false)}
      >
        x
      </button>
    </div>
  );
}
