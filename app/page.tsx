import Link from "next/link";
import AuthButton from "../components/AuthButton";
import { createClient } from "../utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <div>
        <AuthButton />
      </div>
      <div>
        <div>Home page</div>
        {/* conditional for login or to protected page based on logged in */}
        <div>{user && <Link href={"/protected"}>Protected page</Link>}</div>
      </div>
    </div>
  );
}
