import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ToDoClient from "@/components/ToDoClient";

export default async function Todo() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <AuthButton />
      <ToDoClient user={user} />
    </>
  );
}
