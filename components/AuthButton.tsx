import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex bg-neutral justify-end p-2">
      <div className="m-5 text-neutral-content">{user.email}</div>
      <form action={signOut}>
        <button className="btn btn-neutral-content m-2">Logout</button>
      </form>
    </div>
  ) : (
    <button className="btn">
      <Link href="/login">Login</Link>
    </button>
  );
}
