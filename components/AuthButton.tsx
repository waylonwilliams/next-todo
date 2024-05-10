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
    <div className="flex bg-neutral p-2 h-20 justify-end">
      <div className="m-5 text-neutral-content">{user.email}</div>
      <form action={signOut}>
        <button className="btn btn-neutral-content m-2">Logout</button>
      </form>
    </div>
  ) : (
    <div className="flex bg-neutral p-2 h-20 justify-end">
      <button className="btn btn-neutral-content m-2">
        <Link href="/login">Login</Link>
      </button>
    </div>
  );
}
